import {
    Component, Input, Output, EventEmitter, ElementRef, SimpleChanges,
    ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit,
    ChangeDetectorRef, forwardRef, OnChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {coerceBooleanProperty} from '../util/coerce';
import {OnChange} from '../core/decorators';

/*
 * Provider Expression that allows x-switch to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const SWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent),
    multi: true
};

@Component({
    selector: 'x-switch',
    templateUrl: './switch.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [SWITCH_VALUE_ACCESSOR],
    host: {
        'class': 'x-widget x-switch'
    }
})
export class SwitchComponent implements AfterViewInit, OnChanges, ControlValueAccessor {

    /**
     * Whether the switch is checked
     */
    @Input() checked = false;

    /**
     * Extra style classes to provide custom themes, e.g. 'class-1 class-2'
     */
    @Input() styleClass = '';

    /**
     * Whether the switch is disabled
     */
    @OnChange(true)
    @Input() disabled = false;

    /**
     * Event emitted when the switch value changes
     */
    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private el: ElementRef, private cd: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges) {

        // if checked value changes, update form model value and mark for check
        if (changes['checked']) {
            this.checked = changes['checked'].currentValue;
            this._markForCheck();
        }

        // if disabled value changes, mark for check
        if (changes['disabled']) {
            this.disabled = changes['disabled'].currentValue;
            this.cd.markForCheck();
        }
    }

    ngAfterViewInit() {
        const nativeEl = this.el.nativeElement;
        const className = nativeEl.className;

        // add custom classes
        if (this.styleClass) {
            nativeEl.className = className + ' ' + this.styleClass;
        }
    }

    /**
     * Dispatch change event with current value
     * @docs-private
     */
    onChange(checked: boolean) {
        if (this.disabled) {
            return;
        }

        this.checked = checked;
        this.change.emit(checked);

        this._markForCheck();
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
     * @param value Value to be set to the model.
     */
    writeValue(value: any) {
        this.checked = coerceBooleanProperty(value);
    }

    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param isDisabled Whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.cd.markForCheck();
    }

    /**
     * update form model value and mark for check
     */
    _markForCheck() {
        if (this._onModelChange) {
            this._onModelChange(this.checked);
        }

        if (this._onTouch) {
            this._onTouch(this.checked);
        }

        this.cd.markForCheck();
    }
}
