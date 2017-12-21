import {
    Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewChecked,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, AfterViewInit
} from '@angular/core';
import { SelectConfig } from './select.config';

@Component({
    selector: 'nb-select-options',
    templateUrl: './select.options.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class SelectOptionsComponent implements OnInit, AfterViewChecked {
    @Input() data: SelectConfig[] = [];
    @Input() value: number | null | undefined;
    @Input() searchable: boolean;
    @Input() disabled: boolean;
    @Input() styles: SelectConfig[] = [];
    @Output() onChange: EventEmitter<SelectConfig> = new EventEmitter();
    @Output() needReposition: EventEmitter<Object> = new EventEmitter();

    private _data: SelectConfig[] = [];

    constructor(protected cd: ChangeDetectorRef,
                protected el: ElementRef) {
    }

    ngOnInit() {
        this.render();
    }

    ngAfterViewChecked() {
        // this.render();
    }

    render() {
        this._data = SelectOptionsComponent._clone(this.data);
        this.cd.markForCheck();
    }

    onSelectOption(e: Event, data: SelectConfig) {
        e.stopPropagation();

        if (data.children && data.children.length){
            return;
        }

        this.value = data.value;
        this.onChange.emit(data);
        this.cd.markForCheck();
    }

    onSearch(e) {
        e.stopPropagation();

        let key = e.target.value;
        if (key) {
            let result: SelectConfig[] = [];
            this._data.forEach(item => {
                if (item.children && item.children.length){
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

    private static _clone(data: SelectConfig[]) {
        return JSON.parse(JSON.stringify(data));
    }
}
