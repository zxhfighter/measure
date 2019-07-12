import {
    Component, Input, Output, EventEmitter, QueryList, ContentChildren, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, AfterContentInit,
    ViewChild, Renderer2, ContentChild, AfterViewInit, OnDestroy, NgZone, ChangeDetectorRef
} from '@angular/core';

import { OnChange } from '../core/decorators';
import { addClass } from '../util/dom';
import { TableHeaderItemComponent } from './table-th';

/** table order type */
export type OrderType = 'asc' | 'desc' | '';

/**
 * html element position
 * @docs-private
 */
export interface ElementPosition {
    left: number;
    top: number;
}

/** table sort param interface */
export interface SortParam {
    /** sort field */
    orderBy: string;

    /** sort type */
    order: OrderType;
}

/**
 * sort function
 *
 * @param {string} order - order type
 * @param {string} orderBy - order field
 */
export function sortFunc(order: string, orderBy: string) {

    return function (x: any, y: any) {
        const symbol = order === 'asc' ? 1 : -1;
        const a = x[orderBy];
        const b = y[orderBy];

        // 相等，返回0
        if (a === b) {
            return 0;
        }

        if (a === null && b === null) {
            return 0;
        }

        // b是null，desc时排在最后
        if (b === null) {
            return symbol * 1;
        }
        else if (a === null) {
            return symbol * (-1);
        }

        const aIsNumber = !isNaN(a);
        const bIsNumber = !isNaN(b);

        // a, b 都是数字
        if (aIsNumber && bIsNumber) {
            return symbol * (parseFloat(a) - parseFloat(b));
        }

        // a, b 如果有一个能转成数字
        // 能转成数字的永远大。
        if (aIsNumber || bIsNumber) {
            return aIsNumber ? (symbol * 1) : (symbol * -1);
        }

        // 否则就是文字对比
        return symbol * (a + '').localeCompare(b);
    };
}

/**
 * Table Component
 */
@Component({
    selector: 'table[nb-table]',
    templateUrl: './table.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-table',
        '[class.nb-table-bordered]': 'bordered',
        '[class.nb-table-resizable]': 'resizable',
        '(mouseup)': 'onMouseUp()'
    },
    exportAs: 'nbTable'
})
export class TableComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

    /** table sort event emitter, emit a `SortParam` Object with the `order` and `orderBy` property. */
    @Output() sort: EventEmitter<SortParam> = new EventEmitter<SortParam>();

    @Output() dataChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    /**
     * table datasource
     * @default []
     */
    @OnChange(false)
    @Input()
    datasource: any[] = [];

    datasourceChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    /**
     * inner filterd datasource
     * @docs-private
     */
    data: any[] = [];

    /**
     * whether the table is bordered
     * @default false
     */
    @OnChange(true)
    @Input() bordered: boolean = false;

    /**
     * table order state, can be 'asc' or 'desc' or ''
     */
    @OnChange(false, true)
    @Input() order: OrderType;

    /**
     * table order state change event listener
     * @docs-private
     */
    orderChange: EventEmitter<string> = new EventEmitter<string>();

    /**
     * table orderby field
     */
    @OnChange(false, true)
    @Input() orderBy: string;

    /**
     * table orderby field change event listener
     * @docs-private
     */
    orderByChange: EventEmitter<string> = new EventEmitter<string>();

    /** table current page */
    @OnChange()
    @Input() page: number = 1;

    /**
     * table page change event listener
     * @docs-private
     */
    pageChange: EventEmitter<number> = new EventEmitter<number>();

    /** table pageSize */
    @OnChange()
    @Input() pageSize: number;

    /**
     * table pageSize change event listener
     * @docs-private
     */
    pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Whether the table columns can be resizable
     * @default false
     */
    @OnChange(true)
    @Input() resizable: boolean = false;

    /**
     * the table extra theme, i.e. when theme is 'small', an extra class `nb-table-small`
     * will be appended to the host className property
     * @default ''
     */
    @Input() theme: string = '';

    /**
     * Whether the table data is loading
     */
    @OnChange(true)
    @Input() loading: boolean = false;

    /**
     * table head item children
     * @docs-private
     */
    @ContentChildren(
        forwardRef(() => TableHeaderItemComponent), { descendants: true }
    ) _headItems: QueryList<TableHeaderItemComponent>;

    /**
     * resize indicator line
     * @docs-private
     */
    @ViewChild('resizeLine', {static: false}) _resizeLine: ElementRef;

    /**
     * cache table position
     */
    _tablePos: ElementPosition;

    /**
     * current resize column index when resizing table columns
     */
    _columnIndex: number = 0;

    /**
     * current resize column start position when resizing table columns
     */
    _startPos: number;

    /**
     * whether the table is resizing column
     */
    _isDragging: boolean = false;

    /**
     * the distance when resizing column, if < 0, then the current column width will decrease _dx
     * and the next sibling column width will increase _dx
     */
    _distance: number = 0;

    _mouseMoveListener: Function | null;

    constructor(
        private _el: ElementRef,
        private _render: Renderer2,
        private _ngZone: NgZone,
        private _cd: ChangeDetectorRef
    ) {
        this.listenSortParamChange();
        this.listenDatasourceChange();
    }

    startColumnResizing() {
        this._isDragging = true;
        this._cd.markForCheck();

        this.bindMouseEvents();
    }

    bindMouseEvents() {

        this._ngZone.runOutsideAngular(() => {
            const el = this._el.nativeElement;
            this._mouseMoveListener = this._render.listen(el, 'mousemove', this.onMouseMove.bind(this));
        });
    }

    unbindMouseEvents() {
        if (this._mouseMoveListener) {
            this._mouseMoveListener();
            this._mouseMoveListener = null;
        }
    }

    /**
     * listen sort related param change
     * @docs-private
     */
    listenSortParamChange() {
        let self = this;
        self.orderChange.subscribe(
            (order: string) => {
                if (self._headItems) {
                    // reset other head item order status
                    self._headItems.forEach(v => {
                        v.order = (v.field !== self.orderBy ? '' : order);
                    });

                    // emit sort param
                    self.sort.emit({
                        order: (order as OrderType),
                        orderBy: self.orderBy
                    });
                }
            }
        );

        self.pageChange.subscribe(() => {
            this.data = this.getDisplayData();
        });
    }

    listenDatasourceChange() {
        this.datasourceChange.subscribe((datasource: any[] = []) => {
            if (datasource) {
                this.data = this.getDisplayData();
            }
        });
    }

    ngOnInit() {
        this.data = this.getDisplayData();
    }

    getDisplayData() {
        let data: any[] = [...(this.datasource || [])];
        const orderBy = this.orderBy;
        const order = this.order;
        const page = this.page;
        const pageSize = this.pageSize;
        const len = data.length;

        if (order && orderBy) {
            data = data.sort(sortFunc(order, orderBy));
        }

        if (page && pageSize) {
            data = data.slice((page - 1) * pageSize, page * pageSize);
        }

        this.dataChange.emit(data);
        return data;
    }

    ngAfterContentInit() {

        // set child item index
        if (this._headItems) {
            this._headItems.forEach((v, columnIndex) => {
                v._columnIndex = columnIndex;
            });
        }
    }

    /**
     * get table native elment position(left && top)
     * @docs-private
     */
    getTablePosition() {
        try {
            const el = this._el.nativeElement as HTMLTableElement;

            // avoid frequently computing table positions
            if (!this._tablePos) {

                this._tablePos = {
                    left: el.offsetLeft,
                    top: el.offsetTop
                };
            }
            return this._tablePos;
        }
        catch (e) {
            throw new Error('get table position error');
        }
    }

    /**
     * set column resize start position
     * @param {number} left - left position relative to the table
     * @param {number} columnIndex - currently resize column
     * @docs-private
     */
    setColumeResizeStartPosition(left: number, columnIndex: number) {
        this._startPos = left;
        this._columnIndex = columnIndex;

        this.updateResizeLinePosition(left);
    }

    /**
     * update resize indicator line
     * @param {number} left - the left position of indicator line relative to the table
     * @docs-private
     */
    updateResizeLinePosition(left: number) {
        const el = this._resizeLine.nativeElement;
        this._render.setStyle(el, 'left', left + 'px');
    }

    /**
     * table mousemove event, update resize indicator line position
     * @param {MouseEvent} event - mouse event
     * @docs-private
     */
    onMouseMove(event: MouseEvent) {

        if (this._isDragging) {

            // this._ngZone.runOutsideAngular(() => {

            // table left position
            const pos = this.getTablePosition();

            // current end position relative to the table
            const endPos = event.clientX - pos.left;

            // current end position relative to the table subtracts start position relative to the table
            this._distance = endPos - this._startPos;

            // update resize indicator line position to the end position
            this.updateResizeLinePosition(endPos);
            // });
        }

        // it's important here, and it will prevent default behavior like copy content from table
        return false;
    }

    /**
     * talbe mouseup event, when not resize column, do nothing
     * when resize column, update column width and set resizing flag to false
     * @docs-private
     */
    onMouseUp() {
        if (this._isDragging) {

            this._ngZone.runOutsideAngular(() => {
                this.updateTableHeadItemWidth();
                this.unbindMouseEvents();
            });

            this._isDragging = false;
        }
    }

    /**
     * get origin column width array
     * @return {number[]} column width array
     * @docs-private
     */
    getOriginHeadItemWidth() {
        let columnWidthArray: number[] = [];
        if (this._headItems) {
            this._headItems.forEach((v, columnIndex) => {
                columnWidthArray[columnIndex] = v.getElementWidth();
            });
            return columnWidthArray;
        }
        return [];
    }

    /**
     * when column resize is done, update table head item width
     * @docs-private
     */
    updateTableHeadItemWidth() {

        // set newer column width array
        let newColWidths = this.getNewColumnWidth();

        if (this._headItems) {
            this._headItems.forEach((v, columnIndex) => {
                v.setElementWidth(newColWidths[columnIndex]);
            });
        }
    }

    /**
     * when column resize is done, compute the new column width array
     * @docs-private
     */
    getNewColumnWidth(): number[] {
        const self = this;

        // cache distance
        const distance = self._distance;

        // get origin column width array
        let colWidths = self.getOriginHeadItemWidth();

        // set newer column width array
        let newColWidths: number[] = [];

        // compute newer colum width
        colWidths.forEach((width, columnIndex) => {

            // if is current column, add the distance, for example
            // drag to left 10px distance will be 10, drag to right 10px distance will be -10
            if (columnIndex === self._columnIndex) {
                newColWidths[columnIndex] = width + distance;
            }
            // if is next sibling column, substract the distance
            else if (columnIndex === self._columnIndex + 1) {
                newColWidths[columnIndex] = width - distance;
            }
            // other column width will remain the same
            else {
                newColWidths[columnIndex] = width;
            }
        });

        return newColWidths;
    }

    ngAfterViewInit() {
        if (this.theme) {
            addClass(this._el.nativeElement, `nb-table-${this.theme}`);
        }
    }

    ngOnDestroy() {
        this.unbindMouseEvents();
    }
}
