/**
 * @file checkbox component
 * @author zxhfighter(369749456@qq.com)
 */

import {NgModule, Component, ChangeDetectionStrategy, Input, forwardRef, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {UIControl} from '../control';
const prefix = UIControl.uiPrefix;

const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UICheckbox),
    multi: true
};

@Component({
    selector: `${prefix}-checkbox`,
    template: `
        <div class="${prefix}-checkbox" [class.${prefix}-checkbox-checked]="checked">
            <input #check
                id="checkbox-{{ uid }}-{{ value }}"
                type="checkbox"
                value="{{ value }}"
                [disabled]="disabled"
                [(ngModel)]="checked"
                (change)="onChange(check.checked)">
            <label for="checkbox-{{ uid }}-{{ value }}">{{ label }}</label>

            <ng-content></ng-content>
        </div>
    `,
    providers: [CHECKBOX_VALUE_ACCESSOR],
    exportAs: 'UICheckbox'
})
export class UICheckbox extends UIControl {

    /**
     * 复选框名称
     *
     * @type {string}
     */
    @Input() label = '全选';

    @Input() value: string;

    /**
     * 复选框选中情况
     *
     * @type {boolean}
     */
    @Input() checked = false;

    @Input() disabled = false;

    /**
     * check 事件
     * @param {EventEmitter}
     */
    @Output() check = new EventEmitter<boolean>();

    uid = Math.random().toString(16).slice(2, 7);

    /**
     * 变更事件
     *
     * @param {boolean} checked - 是否选中
     */
    onChange(checked: boolean) {
        this.checked = checked;
        this.check.emit(checked);

        if (this.onModelChange) {
            this.onModelChange(this.checked);
        }
    }

    /**
     * 从 form model 中写回 view
     *
     * @param {any} value 值
     */
    writeValue(value: any) {
        this.checked = !!value;
    }

    private onModelChange: Function;
    registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    private onTouch: Function;
    registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [UICheckbox],
    exports: [UICheckbox]
})
export class UICheckboxModule {}
