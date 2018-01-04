import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, Input,
    Output, EventEmitter, ViewChild, ElementRef, Optional, Renderer2,
    ChangeDetectorRef, OnInit, OnDestroy, forwardRef, Inject, AfterViewInit
} from '@angular/core';

import { OnChange } from '../core/decorators';
import { TableComponent, SortParam, OrderType } from './table';

import { OverlayComponent } from '../overlay';
import { OverlayOriginDirective } from '../overlay/overlay-origin.directive';

/** table filter param interface */
export interface FilterParam {
    /** filter field */
    field: string;

    /** filter table header item component */
    target: TableHeaderItemComponent;
}

/** table field setting */
export interface Field {
    /** field name */
    name: string;

    /** field title */
    title: string;

    /** whether the field can be sortted */
    sortable?: boolean;

    /** whether the field can be filtered */
    filterable?: boolean;

    /** whether the field can be tipable */
    tipable?: boolean;

    /** any other props */
    [key: string]: any;
}

/**
 * table header item component
 */
@Component({
    selector: 'th[nb-th], th[field]',
    templateUrl: './table-th.html',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'nb-table-td nb-table-th',
        '[class.nb-table-td-left]': 'align == "left"',
        '[class.nb-table-td-center]': 'align == "center"',
        '[class.nb-table-td-right]': 'align == "right"'
    },
    exportAs: 'nbTH'
})
export class TableHeaderItemComponent implements OnInit, OnDestroy, AfterViewInit {

    /**
     * table filter event, emits a `FilterParam` Object
     */
    @Output() filter: EventEmitter<FilterParam> = new EventEmitter<FilterParam>();

    @Output() filterReset: EventEmitter<FilterParam> = new EventEmitter<FilterParam>();

    @Output() filterHide: EventEmitter<any> = new EventEmitter<any>();

    /**
     * table sort event, emits a `SortParam` Object
     */
    @Output() sort: EventEmitter<SortParam> = new EventEmitter<SortParam>();

    /**
     * Whether the column can be sortable
     */
    @OnChange(true)
    @Input() sortable: boolean;

    /**
     * Whether the column can be tipable（has tip icon with tip information）
     */
    @OnChange(true)
    @Input() tipable: boolean;

    /**
     * Whether the column can be filterable（has filter icon and custom filter panel）
     */
    @OnChange(true)
    @Input() filterable: boolean;

    /**
     * Whether the filter panel should show filter buttons, e.g. when a single select filter, there
     * no need filter button to trigger the filter event
     */
    @Input() showFilterButton: boolean = true;

    /**
     * table cell align position
     * @default left
     */
    @Input() align: 'left' | 'center' | 'right' = 'left';

    @ViewChild('origin') origin: OverlayOriginDirective;
    @ViewChild('overlay') overlay: OverlayComponent;

    /**
     * column order(sort) type, can be 'asc' or 'desc' or ''
     */
    private _order: OrderType;

    /**
     * table field order type
     */
    @Input() get order() { return this._order; }
    set order(value: any) {
        this._order = value;
        this._cd.markForCheck();
    }

    /**
     * column related data field
     */
    @Input() field: string;

    /**
     * Whether the column can be resizable
     * @default false
     */
    @OnChange(true)
    @Input() resizable: boolean = false;

    /**
     * the index in the table columns
     * @docs-private
     */
    _columnIndex: number = 0;

    /**
     * Whether show the filter panel
     * @docs-private
     */
    get showFilter() { return this._showFilter; }
    set showFilter(value: any) {
        this._showFilter = value;
        this._cd.markForCheck();
    }
    private _showFilter: boolean;

    /**
     * Whether the column is in filtered mode
     * @docs-private
     */
    filtered = false;

    /**
     * cache table position
     * @docs-private
     */
    _tablePos: any;

    constructor(
        @Optional() @Inject(forwardRef(() => TableComponent)) private _table: TableComponent,
        private _cd: ChangeDetectorRef,
        private _el: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnInit() {
        if (this._table) {

            // set default sort status
            if (this._table.orderBy === this.field) {
                this.order = this._table.order;
            }

            // it resizable only table can be resizable and column can be resizable
            this.resizable = this._table.resizable /**&& this.resizable **/;
        }

        this.overlay.origin = this.origin;
    }

    toggleOverlay() {
        this.showFilter = !this.showFilter;
        this.overlay.isVisible() ? this.hide() : this.show();
    }

    show() {
        this.showFilter = true;
        this.overlay.show();
    }

    hide() {
        this.showFilter = false;
        this.overlay.hide();
    }

    ngAfterViewInit() {
    }

    /**
     * toggle filter panel
     * @docs-private
     */
    onToggleFilter() {
        this.toggleOverlay();
    }

    ngOnDestroy() {
    }

    /**
     * get the column width
     * @return {number} column width
     * @docs-private
     */
    getElementWidth() {
        const el = this._el.nativeElement as HTMLElement;
        return el.getBoundingClientRect().width;
    }

    /**
     * set the column width
     * @param {number} width - column width
     * @docs-private
     */
    setElementWidth(width: number) {
        const el = this._el.nativeElement as HTMLElement;
        this._render.setStyle(el, 'width', width + 'px');
    }

    /**
     * on column filter
     * @docs-private
     */
    onFilter() {
        // in filter mode
        this.filtered = true;

        this.hide();

        // emit filter params
        this.filter.emit({
            field: this.field,
            target: this
        });
    }

    /**
     * hide filter
     * @docs-private
     */
    onCancel() {
        this.filtered = false;
        this.hide();

        this.filterReset.emit({
            field: this.field,
            target: this
        });
    }


    /**
     * on column sort
     * @docs-private
     */
    onSort() {
        if (!this.sortable) {
            return;
        }

        this.order = (!this.order || this.order === 'asc') ? 'desc' : 'asc';

        // update table current order and orderBy
        if (this._table) {
            this._table.orderBy = this.field;
            this._table.order = this.order;
        }
    }

    /**
     * column resize begin
     * @param {MouseEvent} event - mouse event
     * @docs-private
     */
    onColumnResizeBegin(event: MouseEvent) {

        // cache table position
        if (!this._tablePos) {
            this._tablePos = this._table.getTablePosition();
        }

        // compute left position relative to the table
        const leftRelativeTable = event.clientX - this._tablePos.left;

        // mark the table is resizing columns
        this._table.startColumnResizing();

        // tell the parent table the `_columnIndex`th column is resizing columns
        this._table.setColumeResizeStartPosition(leftRelativeTable, this._columnIndex);

        // it's important here to prevent default copy behaviors
        return false;
    }

    onFilterPanelHide(event: any) {
        this.filterHide.emit(event);
    }
}
