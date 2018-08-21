import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    AfterViewInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    forwardRef,
    ChangeDetectorRef,
    ElementRef,
    Renderer2,
    SimpleChanges
} from '@angular/core';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
    TransferService
} from '../transfer/transfer.service';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const TABLE_TRANSFER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TableTransferComponent),
    multi: true
};

export interface TableConfig {
    headData: any[];
    colWidth: any[];
}

@Component({
    selector: 'nb-table-transfer',
    templateUrl: './table-transfer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [TABLE_TRANSFER_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-table-transfer'
    },
    exportAs: 'nbTableTransfer'
})

export class TableTransferComponent implements OnChanges, AfterViewInit, ControlValueAccessor {

    /** get selected value event */
    @Output() getValue: EventEmitter<number[] | string[] | object[]>
        = new EventEmitter<number[] | string[] | object[]>();

    /** search event */
    @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();

    /** tree node expand event */
    @Output() onExpandNode: EventEmitter<object> = new EventEmitter<object>();

    /** tree node expand event */
    @Output() onExtendData: EventEmitter<object> = new EventEmitter<object>();

    /**
     * candidate list data
     * @default []
     */
    @Input()
    set candidateData(val: any) {
        this._datasource = val;
        this._allDatasource = [...val];
    }

    get candidateData() {
        return this._datasource;
    }

    /**
     * selected list data
     * @default []
     */
    @Input() selectedData: any[] = [];

    /**
     * table head list data
     * @default []
     */
    @Input() tableConfig: TableConfig;

    /**
     * Whether the transfer is disabled
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * custom class name
     * @default ''
     */
    @Input() customClass: string;

    /**
     * Whether the transfer is can all-trans
     * @default false
     */
    @Input() allSelectLink: boolean = true;

    /**
     * Whether the transfer is can all-delete
     * @default false
     */
    @Input() allDeleteLink: boolean = true;

    /**
     * Whether the transfer is have candidate data search-box
     * @default false
     */
    @Input() candidateSearch: boolean = true;

    /**
     * Whether the transfer is have selected data search-box
     * @default false
     */
    @Input() selectedSearch: boolean = true;

    /**
     * candidate data list title
     */
    @Input() candidateTitle: string = '备选列表';

    /**
     * selected data list title
     */
    @Input() selectedTitle: string = '已选列表';

    /**
     * add extend data config
     */
    @Input() addLink: any;

    /**
     * return method make object formatter to array
     * @docs-private
     */
    private _datasource: any = [];

    /**
     * return method make object formatter to array
     * @docs-private
     */
    private _allDatasource: any[] = [];

    /**
     * return method make object formatter to array
     * @docs-private
     */
    selectedDatasource: any[] = [];

    /**
     * return method make object formatter to array
     * @docs-private
     */
    private _selectedDatasource: any[] = [];

    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    private _onModelChange: Function;

    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    private _onTouch: Function;

    /**
     * selected options's id as list
     * @docs-private
     */
    private value: any[] = [];

    /**
     * return method make object formatter to array
     * @docs-private
     */
    objectKeys = Object.keys;

    constructor(
        private _cd: ChangeDetectorRef,
        private el: ElementRef,
        private _render: Renderer2,
        private service: TransferService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['selectedData']) {
            const ids: any[] = changes['selectedData'].currentValue;
            this.selectedDatasource = this._datasource.filter(v => ids.includes(v.id));
            this.copySelectedData();
            this._datasource.forEach(v => {
                v.selected = ids.includes(v.id);
            });
            this.service.sendMsg(
                { candidateCount: this._allDatasource.length, selectedCount: this.selectedDatasource.length }
            );
        }
    }

    ngAfterViewInit() {
        this.getValue.emit(this.selectedDatasource);
    }

    /**
     * linsten model change
     * @docs-private
     */
    onModelChange() {
        this.selectedData = this.selectedDatasource.map(v => v.id);
        if (this._onModelChange) {
            this._onModelChange(this.selectedData);
        }
        this.service.sendMsg(
            { candidateCount: this._allDatasource.length, selectedCount: this.selectedDatasource.length }
        );
    }

    /**
     * selected row
     * @param element selected row
     * @docs-private
     */
    onSelect(element: any) {
        if (this.disabled || element.selected) {
            return;
        }

        const exists = this.selectedDatasource.some(item => item.id === element.id);
        if (!exists) {
            this.selectedDatasource = [...this.selectedDatasource, element];
            element.selected = true;
            this.copySelectedData();
            this.getValue.emit(this.selectedDatasource);
            this.onModelChange();
        }
    }

    /**
     * remove row
     * @param element remove row
     * @docs-private
     */
    onRemove(element: any) {
        if (this.disabled) {
            return;
        }

        const dataItem = this._datasource.find(v => v.id === element.id);
        if (dataItem) {
            dataItem.selected = false;
        }

        this.selectedDatasource = this.selectedDatasource.filter(item => item.id !== element.id);
        this.copySelectedData();
        this.getValue.emit(this.selectedDatasource);
        this.onModelChange();
    }

    /**
     * trans all or not trans all item
     * @param e trans option
     * @docs-private
     */
    transAll(e) {
        if (this.disabled) {
            return;
        }
        const chkVal = e.chkVal;

        this._datasource.forEach(v => {
            v.selected = chkVal ? true : false;
        });
        this.selectedDatasource = chkVal ? [...this._datasource] : [];
        this.copySelectedData();

        this.getValue.emit(this.selectedDatasource);
        this.onModelChange();
    }

    /**
     * fitler candidate or selected list by key word
     * @param e search key word
     * @docs-private
     */
    searchByKeyWord(e: any) {
        const searchText = e.event;
        const mode = e.mode;
        if (mode === 'candidate') {
            this._datasource = this._allDatasource.filter(element => element.name.indexOf(searchText) !== -1);
        } else {
            this.selectedDatasource
                = this._selectedDatasource.filter(element => element.name.indexOf(searchText) !== -1);
        }
    }

    /**
     * shallow copy selectedDatasource
     * @docs-private
     */
    copySelectedData() {
        this._selectedDatasource = [...this.selectedDatasource];
    }

    /**
     * throw out extend data event
     * @docs-private
     */
    extendData() {
        this.onExtendData.emit();
    }

    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn On change callback function.
     */
    registerOnChange(fn: Function) {
        this._onModelChange = fn;
    }

    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn On touch callback function.
     */
    registerOnTouched(fn: Function) {
        this._onTouch = fn;
    }

    /**
     * set table-transfer model value
     * @docs-private
     */
    writeValue(value: any) {
        // this.value = value;
        if (value != null) {
            this.selectedData = value;
            this.selectedDatasource = this._datasource
                .filter(v => this.selectedData.includes(v.id));
        }
        // this._cd.markForCheck();
    }

    // /**
    //  * update form model value and mark for check
    //  * @docs-private
    //  */
    // _markForCheck() {
    //     if (this._onModelChange) {
    //         this._onModelChange(this.value);
    //     }

    //     if (this._onTouch) {
    //         this._onTouch(this.value);
    //     }

    //     this._cd.markForCheck();
    // }
}
