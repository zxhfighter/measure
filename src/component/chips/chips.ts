import {
    Component, Input, Output, EventEmitter, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    forwardRef, ChangeDetectorRef
} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {OnChange} from '../core/decorators';

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
    providers: [CHIPS_VALUE_ACCESSOR],
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-chips'
        // '[class.nb-chips-disabled]': 'disabled',
    }
})
export class ChipsComponent implements OnInit, ControlValueAccessor {
    /**
     * The event emitted when input value changes
     */
    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Edited chips
     * @default []
     */
    @Input() value: Array<String> = [];

    /**
     * Whether the spinner is disabled
     * @default false
     */
    @Input() disabled: boolean = false;

    constructor(
        private el: ElementRef,
        private _cd: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
    }

    /**
     * Input event
     * @param {String} k event type
     * @param {String} v input value
     */
    onInputValue(k, v) {
        if (this.disabled) {
            return;
        }
        switch (k) {
            case 'Enter':
                if (!v) {
                    event.target.value = '';
                    break;
                }
                event.target.value = '';
                this.value = this.value.concat(v);
                this.change.emit(this.value);
                this._markForCheck();
                break;
            case 'Backspace':
                let chip = event.target.parentElement.previousSibling;
                if (!event.target.value.length && chip.nodeName === 'LI') {
                    chip.remove();
                    this.value = this.value.slice(0, -1);
                    this.change.emit(this.value);
                    this._markForCheck();
                }
                break;
        }
    }

    /**
     * Delete chip event
     * @param {String} v to delete value
     */
    onDelChip(v) {
        if (this.disabled) {
            return;
        }
        let target = event.target;
        let sel = this.value.find((v, i) => return v + '' === target.previousSibling.data);
        let index = this.value.indexOf(sel);
        target.parentElement.remove();
        this.value = this.value.slice(0, index).concat(this.value.slice(index + 1));
        this.change.emit(this.value);
        this._markForCheck();
    }

    /**
     * Imitate input focus event
     * @param {object} input input element
     */
    inputFocus(input) {
        input.el.nativeElement.focus()
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
