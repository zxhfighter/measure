import {
    Component, Input, Output, EventEmitter, Optional, OnInit, AfterViewInit,
    ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BoxGroupComponent } from './box-group';
import { uuid as getUUID } from '../util/uuid';
import { addClass } from '../util/dom';
import { OnChange } from '../core/decorators';
import { coerceBooleanProperty } from '../util/coerce';

/** box type: radio or checkbox */
export type BOX_TYPE = 'radio' | 'checkbox';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const BOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputBoxComponent),
    multi: true
};


/**
 * A single checkbox or radiobox
 */
@Component({
    selector: 'nb-checkbox',
    templateUrl: './box.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [BOX_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-checkbox',
        '[class.nb-checkbox-disabled]': 'disabled',
        '[class.nb-checkbox-checked]': 'checked',
        '[class.nb-checkbox-intermediate]': 'intermediate',
        '[class.nb-checkbox-radio]': 'type == "radio"'
    },
    exportAs: 'nbBox'
})
export class InputBoxComponent implements OnInit, AfterViewInit, ControlValueAccessor {

    /** When the box state change, emit a change event with a boolean value */
    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** to enable [(checked)] style, we need to add a checkedChange event */
    @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * box type: either 'checkbox' or 'radio'
     * @default checkbox
     */
    @OnChange()
    @Input() type: 'radio' | 'checkbox' = 'checkbox';

    /**
     * input name, used to group radio inputs
     * @docs-private
     */
    @OnChange()
    @Input() uuid: string = getUUID();

    /**
     * Whether the box is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /**
     * Whether the box is checked
     * @default false
     */
    @OnChange(true, true)
    @Input() checked: boolean = false;

    /**
     * Whether the box is intermediate
     * @default false
     */
    @OnChange(true, true)
    @Input() intermediate: boolean = false;

    /**
     * extra theme class
     * @default ''
     */
    @Input() theme: string = '';

    /** box value, can be any type */
    @Input() value: any;

    /** if using within boxgroup, the parent boxgroup component */
    _parentBox: BoxGroupComponent;

    /**
     * box component constructor
     *
     * @param {BoxGroupComponent?} parentBox - find parent box group component and inject it
     */
    constructor(
        @Optional() parentBox: BoxGroupComponent,
        private _el: ElementRef,
        private _cd: ChangeDetectorRef
    ) {
        this._parentBox = parentBox;
    }

    ngOnInit() {
        // when child onInit, it can get parent and parent binded properties
        // if using within boxgroup, set child box type and name
        if (this._parentBox) {
            this.type = (this._parentBox.type as BOX_TYPE);
            this.uuid = this._parentBox.uuid;
            this.disabled = this.disabled || this._parentBox.disabled;

            const value = (this._parentBox.value || []) as any[];
            this.checked = value.indexOf(this.value) !== -1 || this.checked;
        }
    }

    ngAfterViewInit() {
        if (this.theme) {
            addClass(this._el.nativeElement, `nb-checkbox-${this.theme}`);
        }
    }

    /**
     * input checked change event
     *
     * @param {boolean} checked - whether the input is checked
     * @param {Event} event - original change event, to prevent input default change event
     * @docs-private
     */
    onChange(checked: boolean, event: Event) {
        if (this.disabled) {
            return;
        }

        if (this._parentBox) {
            this._parentBox.select(this.value);
        }
        else {
            this.checked = checked;
            this.intermediate = false;
            this.change.emit(checked);
            this.checkedChange.emit(checked);

            this._updateFormModel();
        }

        this.preventCheckboxDefaultEvent(event);
    }

    /**
     * Prevent input default change event
     *
     * @param {Event} event - original change event, to prevent input default change event
     * @docs-private
     */
    onInputChange(event: Event) {
        this.preventCheckboxDefaultEvent(event);
    }

    /**
     * Prevent default click event
     *
     * @param {Event} event - original change event, to prevent input default change event
     * @docs-private
     */
    preventCheckboxDefaultEvent(event: Event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.returnValue = false;
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
     * @param value Value to be set to the model.
     */
    writeValue(value: any) {
        this.checked = coerceBooleanProperty(value);
        this._cd.markForCheck();
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
     */
    _updateFormModel() {
        if (this._onModelChange) {
            this._onModelChange(this.checked);
        }

        if (this._onTouch) {
            this._onTouch(this.checked);
        }
    }
}
