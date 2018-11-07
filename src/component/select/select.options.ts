import {
    Component, Input, Output, EventEmitter, forwardRef, ElementRef,
    OnChanges, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit
} from '@angular/core';
import { SelectConfig } from './select.config';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const SELECT_OPTIONS_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectOptionsComponent),
    multi: true
};

@Component({
    selector: 'nb-select-options',
    templateUrl: './select.options.html',
    providers: [SELECT_OPTIONS_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class SelectOptionsComponent implements ControlValueAccessor, OnChanges, OnInit {
    @Input() data: SelectConfig[] = [];
    @Input() value: number | null | undefined;
    @Input() searchable: boolean;
    @Input() disabled: boolean;
    @Input() styles: SelectConfig[] = [];
    @Output() onChange: EventEmitter<SelectConfig> = new EventEmitter();
    @Output() needReposition: EventEmitter<Object> = new EventEmitter();
    onModelChange: Function = () => {};
    onModelTouched: Function = () => {};

    private _data: SelectConfig[] = [];
    constructor(protected cd: ChangeDetectorRef,
                protected el: ElementRef) {
    }

    ngOnChanges() {
        // this.render();
    }

    ngOnInit() {
        this._data = SelectOptionsComponent._clone(this.data);
    }

    render() {
        // this._data = SelectOptionsComponent._clone(this.data);
        // this.cd.markForCheck();
    }

    onSelectOption(e: Event, data: SelectConfig) {
        e.stopPropagation();

        if (data.children && data.children.length) {
            return;
        }

        this.value = data.value;
        this.onModelChange(data);
        this.onModelTouched();
        this.onChange.emit(data);
        this.cd.markForCheck();
    }

    onSearch(e) {
        e.stopPropagation();

        let key = e.target.value;
        if (key) {
            let result: SelectConfig[] = [];
            this._data.forEach(item => {
                if (item.children && item.children.length) {
                    item.children.forEach(child => {
                        if (child.label.search(key) !== -1) {
                            result.push(child);
                        }
                    });
                }
                else {
                    if (item.label.search(key) !== -1) {
                        result.push(item);
                    }
                }
            });

            this.data = result;
        }
        else {
            this.data = this._data;
        }

        this.cd.markForCheck();
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    private static _clone(data: SelectConfig[]) {
        return (data && data.length) && JSON.parse(JSON.stringify(data));
    }
}
