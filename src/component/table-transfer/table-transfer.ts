import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    forwardRef,
    ChangeDetectorRef,
    ElementRef,
    Renderer2,
    SimpleChanges,
    TemplateRef
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
    hideCol: any[];
}

@Component({
    selector: 'nb-table-transfer',
    templateUrl: './table-transfer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [TABLE_TRANSFER_VALUE_ACCESSOR, TransferService],
    host: {
        'class': 'nb-widget nb-table-transfer'
    },
    exportAs: 'nbTableTransfer'
})

export class TableTransferComponent implements OnChanges, ControlValueAccessor {

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
        const value = val || [];
        this._datasource = value;
        this._allDatasource = [...value];
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
     * name length limit value
     */
    @Input() nameLenLimit: number = 6;

    /**
     * support custom template
     */
    @Input() optionTplLeft: TemplateRef<any>;

    /**
     * support custom template
     */
    @Input() optionTplRight: TemplateRef<any>;

    /**
     * 空数据模板
     */
    @Input() emptyTpl: TemplateRef<any>;

    /**
     * 空数据字符串
     */
    @Input() emptyMessage: string = '暂无数据';

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
        const candidate = changes['candidateData'];
        const selected = changes['selectedData'];
        const candidateVal = candidate && candidate.currentValue;
        const selectedVal = selected && selected.currentValue;

        if ((selected && selectedVal && selectedVal.length)
            || (candidate && candidateVal && candidateVal.length)) {

            let datasourceLen = 0;
            let selectedLen = 0;

            const ids: any[] = selectedVal ? selectedVal : this.selectedData;

            const datasource = candidateVal ? candidateVal : this._datasource;

            // 根据已选id数组，从备选当中过滤出已选的数据，同时计算已选length
            if (datasource && datasource.length) {
                this.selectedDatasource = this.copy(datasource).filter(v => {

                    // 有二级节点
                    if (v.children) {
                        v.children = v.children.filter(child => {
                            return ids.includes(child.id);
                        });
                        selectedLen += v.children.length;
                        return v.children.length;
                    }

                    else {
                        const exist = ids.includes(v.id);
                        if (exist) {
                            selectedLen += 1;
                        }
                        return exist;
                    }
                });

                this.copySelectedData();

                // 计算备选length
                datasourceLen = this.leftCountChange(datasource);

                // 更新备选数据为选中状态
                datasource.forEach(v => {
                    // 有二级节点
                    if (v.children) {
                        v.children.forEach(child => {
                            child.selected = ids.includes(child.id);
                        });
                    }
                    else {
                        v.selected = ids.includes(v.id);
                    }
                });

                this.noticeCountChange(datasourceLen, selectedLen);
            }
        }
    }

    /**
     * linsten model change
     * @docs-private
     */
    onModelChange() {
        const datasourceLen = this.leftCountChange();
        const selectedLen = this.rightCountChange();

        this.noticeCountChange(datasourceLen, selectedLen);
    }

    /**
     * 更新已选值，并将备选及已选数组length push给basic transfer
     */
    noticeCountChange(datasourceLen, selectedLen) {
        if (this._onModelChange) {
            this._onModelChange(this.selectedData);
        }
        this.service.sendMsg(
            { candidateCount: datasourceLen, selectedCount: selectedLen }
        );
    }

    /**
     * 计算备选数据length
     * @param data 备选数据，默认为全量备选数据
     */
    leftCountChange(data = this._allDatasource) {
        let datasourceLen = 0;
        data.forEach(v => {
            if (v.children) {
                datasourceLen += v.children.length;
                return;
            }
            datasourceLen += 1;
        });

        return datasourceLen;
    }

    /**
     * 计算已选数据length
     */
    rightCountChange() {
        let selectedLen = 0;
        let selectedData: any[] = [];

        this._selectedDatasource.forEach(v => {
            if (v.children) {
                selectedLen += v.children.length;
                v.children.forEach(child => {
                    selectedData.push(child.id);
                });
                return;
            }
            selectedData.push(v.id);
            selectedLen += 1;
        });
        this.selectedData = selectedData;

        return selectedLen;
    }

    /**
     * selected row
     * @param element selected row
     * @docs-private
     */
    onSelect(element: any) {
        if (this.disabled || element.selected || element.disabled) {
            return;
        }

        const exists = this.selectedDatasource.some(item => item.id === element.id);

        if (!exists) {
            this.selectedDatasource = [...this.selectedDatasource, element];
            this._selectedDatasource = [...this._selectedDatasource, element];
            element.selected = true;
            this._allDatasource.forEach( item => {
                item.selected = item.id === element.id ? true : item.selected;
            });
            this.getValue.emit(this.selectedDatasource);
            this.noticeCountChange(null, this.rightCountChange());
        }
    }

    /**
     * select child node
     * @param node current node
     */
    onSelectChildNode(parent, element) {
        if (this.disabled || element.selected || element.disabled) {
            return;
        }

        // 判断当前选中节点在已选中是否有parent节点
        const exsit = this.selectedDatasource.filter(data => data.name === parent);

        if (exsit.length) {
            this.selectedDatasource.forEach(v => {
                if (v.name === parent) {
                    v.children = v.children.concat(element);
                }
            });
        }
        else {
            this.selectedDatasource = this.selectedDatasource.concat({
                name: parent,
                children: [element]
            });
        }

        element.selected = true;

        this._allDatasource.forEach( item => {
            if (item.children) {
                item.children.forEach( child => {
                    child.selected = child.id === element.id ? true : child.selected;
                });
            }
        });

        this.copySelectedData();
        this.getValue.emit(this.selectedDatasource);
        this.noticeCountChange(null, this.rightCountChange());
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
        const selected = ['selectedDatasource', '_selectedDatasource'];
        const candidate = [this._datasource, this._allDatasource];
        const dataItem = this._datasource.find(v => v.id === element.id);

        if (dataItem) {
            dataItem.selected = false;
        }

        selected.forEach(data => {
            this[data] = this[data].filter(item => item.id !== element.id);
        });

        candidate.forEach(data => {
            data.forEach(item => {
                if (item.id === element.id) {
                    item.selected = false;
                }
            });
        });

        this.getValue.emit(this.selectedDatasource);
        this.noticeCountChange(null, this.rightCountChange());
    }

    /**
     * 删除选中的子节点
     * @param parent 父节点
     * @param element 子节点
     */
    onRemoveChildNode(parent, element) {
        if (this.disabled) {
            return;
        }

        const candidate = [this._datasource, this._allDatasource];
        const selected = ['selectedDatasource', '_selectedDatasource'];

        selected.forEach( data => {
            this[data] = this.copy(this[data]).filter(item => {
                if (item.name === parent) {
                    item.children = item.children.filter(child => child.id !== element.id);
                }
                return item.children.length;
            });
        });

        candidate.forEach(data => {
            data.forEach(item => {
                if (item.name === parent) {
                    item.children.forEach( child => {
                        if (child.id === element.id) {
                            child.selected = false;
                        }
                    });
                }
            });
        });

        this.getValue.emit(this.selectedDatasource);
        this.noticeCountChange(null, this.rightCountChange());
    }

    copy(data) {
        return JSON.parse(JSON.stringify(data));
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

        this.dataIterator(this._datasource, chkVal ? true : false);
        this.dataIterator(this._allDatasource, chkVal ? true : false);

        // 已选数据需要过滤掉备选中disabled的数据
        this.selectedDatasource = chkVal
            ? this.copy(this._allDatasource).filter(v => {
                if (v.children) {
                    v.children = v.children.filter(child => {
                        return !child.disabled;
                    });
                    return v.children.length;
                }
                return !v.disabled;
            })
            : [];

        this.copySelectedData();
        this.getValue.emit(this.selectedDatasource);
        this.noticeCountChange(null, this.rightCountChange());
    }

    /**
     * 数据遍历器
     * @param origin 待遍历的数据
     * @param bool
     */
    dataIterator(origin, bool) {
        origin.forEach(v => {
            if (v.children) {
                v.children.forEach(child => {
                    if (!child.disabled) {
                        child.selected = bool;
                    }
                });
                return;
            }
            v.selected = bool;
        });
    }

    /**
     * fitler candidate or selected list by key word
     * @param e search key word
     * @docs-private
     */
    searchByKeyWord(e: any) {
        const searchText = e.event;
        const mode = e.mode;
        const key = new RegExp(searchText.trim(), 'i');

        if (mode === 'candidate') {
            this._datasource = this.copy(this._allDatasource).filter(v => {
                if (v.children) {
                    v.children = v.children.filter(child => {
                        return child.name && child.name.match(key);
                    });
                    return v.children.length;
                }
                return v.name && v.name.match(key);
            });
        } else {
            this.selectedDatasource = this.copy(this._selectedDatasource).filter(v => {
                if (v.children) {
                    v.children = v.children.filter(child => {
                        return child.name && child.name.match(key);
                    });
                    return v.children.length;
                }
                return v.name && v.name.match(key);
            });
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
        if (this.disabled) {
            return;
        }
        this.onExtendData.emit();
    }

    /**
     * judge text length whether is over long or not
     * @docs-private
     */
    judgeOverLong(event: string) {
        return event.length >= this.nameLenLimit ? true : false;
    }

    /**
     * toggle parent node, expand or shrink
     */
    onToggle(item: any) {
        item.shrink = !item.shrink;
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

    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param isDisabled Whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
