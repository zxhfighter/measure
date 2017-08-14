/**
 * @file buttongroup component
 * @author zxhfighter(369749456@qq.com)
 */

import {
    NgModule, Component, ChangeDetectionStrategy, OnInit, forwardRef,
    Input, Output, AfterViewInit, ElementRef, EventEmitter
} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UIButtonModule} from '../button';
import {UIControl} from '../control';
import {BaseItem} from '../common/interface';

const prefix = UIControl.uiPrefix;

const BUTTONGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UIButtonGroup),
    multi: true
};

@Component({
    selector: `${prefix}-buttongroup`,
    template: `
        <ng-container
            *ngFor="let item of datasource; first as isFirst; last as isLast; trackBy: trackByValue">
            <ui-button 
                (click)="onSelect(item)"
                class="buttongroup-item"
                [class.buttongroup-item-selected]="isSelected(item)"
                [class.buttongroup-item-first]="isFirst" 
                [class.buttongroup-item-last]="isLast"
                [disabled]="disabled || item.disabled">
                {{ item.name }}
            </ui-button>
        </ng-container>
    `,
    host: {
        class: `${prefix}-control ${prefix}-buttongroup clearfix`
    },
    providers: [BUTTONGROUP_VALUE_ACCESSOR],
    exportAs: 'UIButtonGroup'
})
export class UIButtonGroup extends UIControl implements OnInit, AfterViewInit, ControlValueAccessor {

    @Input() disabled = false;

    @Output() change: EventEmitter<any[]> = new EventEmitter<any[]>();

    private _datasource: BaseItem[];

    /** button group datasource */
    @Input() set datasource(data: BaseItem[]) {
        this._datasource = data;
    }

    get datasource() {
        return this._datasource;
    }

    /* button group type */
    @Input() type: 'radio'|'checkbox' = 'radio';

    constructor(private el: ElementRef) {
        super();
    }

    private _value: any[];
    @Input() set value(val: any) {

        if (val) {
            if (typeof val === 'number' || typeof val === 'string') {
                this._value = [val];
            }
            else if (Object.prototype.toString.call(val) === '[object Array]') {
                this._value = [...val];
            }
        }
        else {
            this._value = [];
        }
    }

    get value(): any {
        return this._value || [];
    }

    trackByValue(item: BaseItem) {
        return item.value;
    }

    ngAfterViewInit() {
        const ele = this.el.nativeElement;
        const data = this.datasource;

        if (this.type === 'radio') {
            ele.className = ele.className + ` ${prefix}-buttongroup-${this.type}`;
        }
        else if (this.type === 'checkbox') {
            ele.className = ele.className + ` ${prefix}-buttongroup-${this.type}`;
        } 
    }

    ngOnInit() {
        const data = this.datasource;
        if (this.type === 'radio' && !this.value.length && data.length) {
            this.value = [data[0].value];
        }
    }

    onSelect(item: BaseItem) {
        if (this.value.indexOf(item.value) === -1) {

            if (this.type === 'radio') {
                this.value = [item.value];
            }
            else if (this.type === 'checkbox') {
                this.value = [...this.value, item.value];
            }
        }
        else {
            if (this.type === 'checkbox') {
                this.value = this.value.filter(v => v !== item.value);
            }
        }
        
        this.onChange([...this.value]);
    }

    onChange(value) {
        this.change.emit([...this.value]);
        
        if (this.onModelChange) {
            this.onModelChange([...this.value]);
        }
    }

    isSelected(item: BaseItem) {
        return this.value.indexOf(item.value) !== -1;
    }

    writeValue(value: any): void {
        this.value = value;
    }

    private onModelChange: Function;
    registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    private onTouch: Function;
    registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
}

@NgModule({
    imports: [CommonModule, UIButtonModule],
    declarations: [UIButtonGroup],
    exports: [UIButtonGroup]
})
export class UIButtonGroupModule {}
