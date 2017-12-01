import {
    Component, Input, Output, EventEmitter, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    forwardRef, ChangeDetectorRef, ViewChild, ViewChildren,
    QueryList, Renderer2
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnChange } from '../core/decorators';
import { ENTER, BACKSPACE } from '../core/keycodes';
import { ListItemDirective } from './chips.directive';
import { InputComponent } from '../../component/input';
import { ElementDef } from '@angular/core/src/view';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChipsComponent),
    multi: true
};

@Component({
    selector: 'nb-chips',
    templateUrl: './chips.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CHIPS_VALUE_ACCESSOR, ListItemDirective],
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-chips'
    }
})
export class ChipsComponent implements ControlValueAccessor {
    /**
     * The event emitted when chips value changes
     */
    @Output() change: EventEmitter<string[]> = new EventEmitter<string[]>();

    /**
     * Default chips value
     * @default []
     */
    @Input() value: Array<string> = [];

    /**
     * Whether the chips is disabled
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * 获取input输入框
     */
    @ViewChild('input') liInput: ElementRef;

    /**
     * 获取已输入的chips list
     */
    @ViewChildren(ListItemDirective) chipsLi: QueryList<ListItemDirective>;

    constructor(
        private el: ElementRef,
        private _cd: ChangeDetectorRef,
        private render: Renderer2
    ) {
    }

    /**
     * Input event
     * @param {number} k event type
     * @param {string} v input value
     */
    onInputValue(k: number, v: string) {
        if (this.disabled) {
            return;
        }
        try {
            const codeEl = this.liInput.nativeElement as HTMLElement;
            switch (k) {
                case ENTER:
                    if (!v) {
                        this.render.setProperty(codeEl, 'value', '');
                        break;
                    }
                    this.render.setProperty(codeEl, 'value', '');
                    this.value = this.value.concat(v);
                    this.change.emit(this.value);
                    this._markForCheck();
                    break;
                case BACKSPACE:
                    if (!v.length && this.chipsLi.length) {
                        this.value = this.value.slice(0, -1);
                        this.change.emit(this.value);
                        this._markForCheck();
                    }
                    break;
            }
        } catch (error) {
            throw new Error('only work in browser, see error: ' + error);
        }
    }

    /**
     * Delete chip event
     * @param {string} v to delete value
     */
    onDelChip(i: number) {
        if (this.disabled) {
            return;
        }
        this.value = this.value.slice(0, i).concat(this.value.slice(i + 1));
        this.change.emit(this.value);
        this._markForCheck();
    }

    /**
     * Imitate input focus event
     * @param {object} input input element
     */
    inputFocus() {
        const codeEl = this.liInput.nativeElement as HTMLElement;
        codeEl.focus();
    }

    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    private _onModelChange: Function;

    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn On change callback function.
     */
    registerOnChange(fn: Function) {
        this._onModelChange = fn;
    }

    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    private _onTouch: Function;

    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn On touch callback function.
     */
    registerOnTouched(fn: Function) {
        this._onTouch = fn;
    }

    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {any} value - value to be set to the model.
     */
    writeValue(value: any) {
        if (value) {
            this.value = value;
            this._cd.markForCheck();
        }
    }

    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param {boolean} isDisabled - Whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * update form model value and mark for check
     * @docs-private
     */
    _markForCheck() {
        if (this._onModelChange) {
            this._onModelChange(this.value);
        }

        if (this._onTouch) {
            this._onTouch(this.value);
        }

        // this._cd.markForCheck();
    }
}
