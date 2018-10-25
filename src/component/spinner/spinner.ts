import {
    Component, Input, Output, EventEmitter, ChangeDetectorRef, Renderer2,
    ViewEncapsulation, ChangeDetectionStrategy, forwardRef
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OnChange } from '../core/decorators';
import { UP_ARROW, DOWN_ARROW } from '../core/keycodes';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SpinnerComponent),
    multi: true
};

/**
 * Spinner Input Component
 */
@Component({
    selector: 'nb-spinner',
    templateUrl: './spinner.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [SPINNER_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-spinner',
        '[class.nb-spinner-disabled]': 'disabled'
    }
})
export class SpinnerComponent implements ControlValueAccessor {

    /**
     * the event emitted when input value changes
     */
    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Spinner value
     * @default 0
     */
    @Input() value: number = 0;

    /**
     * Spinner step value, default to 1
     * @default 1
     */
    @Input() step: number = 1;

    /**
     * Spinner max value
     */
    @Input() minValue: number;

    /**
     * Spinner min value
     */
    @Input() maxValue: number;

    /**
     * Whether the spinner is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    constructor(private _cd: ChangeDetectorRef, private _render: Renderer2) { }

    /**
     * add a step value
     * @docs-private
     */
    up() {
        if (this.disabled) {
            return;
        }
        // event.preventDefault();
        const nextValue = this.value + this.step;
        const isMaxValue = typeof this.maxValue === 'number' && nextValue > this.maxValue;
        this.value = isMaxValue ? this.maxValue : nextValue;
        this.change.emit(this.value);

        this._markForCheck();
    }

    /**
     * subtract a step value
     * @docs-private
     */
    down() {
        if (this.disabled) {
            return;
        }
        // event.preventDefault();
        const nextValue = this.value - this.step;
        const isMinValue = typeof this.minValue === 'number' && nextValue < this.minValue;
        this.value = isMinValue ? this.minValue : nextValue;
        this.change.emit(this.value);

        this._markForCheck();
    }

    /**
     * check input value
     *
     * @param {string} value - current underlying input value
     * @param {HTMLInputElement} input - underlying input
     * @docs-private
     */
    onInputCheck(value: string, input: HTMLInputElement) {
        const num = +value;
        if (isNaN(num)) {
            this._render.setProperty(input, 'value', this.value + '');
            return;
        }
        else if (this.hasMaxValue() && num > this.maxValue) {
            this.value = this.maxValue;
            this._render.setProperty(input, 'value', this.value + '');
        }
        else if (this.hasMinValue() && num < this.minValue) {
            this.value = this.minValue;
            this._render.setProperty(input, 'value', this.value + '');
        }
        else {
            this.value = num;
        }

        this.change.emit(this.value);
        this._markForCheck();
    }

    /**
     * Whether the spinner has set max value
     * @docs-private
     */
    hasMaxValue() {
        return typeof this.maxValue === 'number';
    }

    /**
     * Whether the spinner has set min value
     * @docs-private
     */
    hasMinValue() {
        return typeof this.minValue === 'number';
    }

    /**
     * use keyboard up and down arrow
     * @docs-private
     */
    onInputKeyup(keyCode: number) {
        if (keyCode === UP_ARROW) {
            this.up();
        }

        if (keyCode === DOWN_ARROW) {
            this.down();
        }
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
        if (!isNaN(value)) {
            this.value = +value;
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
