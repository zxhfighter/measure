import {
    Component, Input, Output, EventEmitter, ElementRef,
    ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { coerceBooleanProperty } from '../util/coerce';
import { OnChange } from '../core/decorators';
import { addClass } from '../util/dom';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const SWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent),
    multi: true
};

/**
 * Switch Component
 */
@Component({
    selector: 'nb-switch',
    templateUrl: './switch.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [SWITCH_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-switch'
    },
    exportAs: 'xSwitch'
})
export class SwitchComponent implements AfterViewInit, ControlValueAccessor {

    /**
     * Event emitted when the switch value changes, emits the checked `boolean` value
     */
    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Whether the switch is checked
     * @default false
     */
    @OnChange(true)
    @Input() checked: boolean = false;

    /**
     * Whether the switch is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /**
     * Extra theme classes to provide custom themes, when theme is 'small', a `nb-switch-small` class will be added
     * @default ''
     */
    @Input() theme: string = '';

    constructor(private _el: ElementRef) { }

    ngAfterViewInit() {
        // add custom theme
        if (this.theme) {
            addClass(this._el.nativeElement, `nb-switch-${this.theme}`);
        }
    }

    /**
     * Dispatch change event with current value
     * @docs-private
     */
    onChange(checked: boolean, event: Event) {
        if (this.disabled) {
            return;
        }

        this.checked = checked;
        this.change.emit(checked);

        // update form model
        this.updateFormModel();

        // we have to stop checkbox's defualt change event
        event.stopPropagation();
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
    }

    /**
     * update form model value and mark for check
     * @docs-private
     */
    updateFormModel() {
        if (this._onModelChange) {
            this._onModelChange(this.checked);
        }

        if (this._onTouch) {
            this._onTouch(this.checked);
        }
    }
}
