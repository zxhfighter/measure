import {
    Component, Input, Output, EventEmitter, ContentChildren, QueryList, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, ViewChildren,
    AfterViewChecked, ChangeDetectorRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {InputBoxComponent} from './box';
import {coerceBooleanProperty} from '../util/coerce';
import {uuid as getUUID} from '../util/uuid';
import {OnChange} from '../core/decorators';

/** box group type */
export type BOX_GROUP_TYPE = 'radio' | 'checkbox';

/** box group value type */
export interface BoxGroupValue {
    /** current changed box value */
    currentValue: any;

    /** all box group value, usually an array */
    value: any[];
}

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const BOXGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BoxGroupComponent),
    multi: true
};

/**
 * Box Group Component
 */
@Component({
    selector: 'nb-boxgroup',
    templateUrl: './box-group.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [BOXGROUP_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-boxgroup',
        '[class.nb-boxgroup-disabled]': 'disabled'
    }
})
export class BoxGroupComponent implements ControlValueAccessor {

    /**
     * when box group value change, emit a change event with the `BoxGroupValue`, which contains
     * the `currentValue` and `value` property
     */
    @Output() change: EventEmitter<BoxGroupValue> = new EventEmitter<BoxGroupValue>();

    /**
     * box group type, either 'checkbox' or 'radio'
     * @default checkbox
     */
    @OnChange()
    @Input() type: 'radio' | 'checkbox' = 'checkbox';

    /**
     * Whether the box group is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /**
     * @docs-private
     */
    disabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * the value associated with the box group
     */
    @OnChange()
    @Input() value: any;

    /**
     * the unique name of the box group
     * @docs-private
     */
    @OnChange()
    @Input() uuid: string = getUUID();

    /** children box components */
    @ContentChildren(forwardRef(() => InputBoxComponent)) _boxList: QueryList<InputBoxComponent>;

    constructor(private cd: ChangeDetectorRef) {

        // listen to disabled property, and update sub child disabled state
        this.disabledChange.subscribe(disabled => {
            if (this._boxList) {
                this._boxList.forEach(box => {
                    box.disabled = disabled;
                });
            }
        });
    }

    /**
     * select some value, according to the type, change sub box component behavior
     *
     * @param {any} value - box value
     * @docs-private
     */
    select(value: any) {

        if (!this._boxList) {
            return;
        }

        if (this.type === 'radio') {
            this._boxList.forEach(item => {
                item.checked = item.value === value;
            });
            this.value = [value];
            this.change.emit({
                currentValue: value,
                value: this.value
            });
        }
        else if (this.type === 'checkbox') {
            const box = this._boxList.find(v => v.value === value);

            // de-duplicate value items
            const valueSet = new Set(this.value);
            if (box) {
                box.checked = !box.checked;
                box.checked ? valueSet.add(value) : valueSet.delete(value);
                this.value = Array.from(valueSet);
                this.change.emit({
                    currentValue: value,
                    value: this.value
                });
            }
        }

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
    writeValue(value: any[]) {
        if (value) {
            this.value = value;

            // when init, set children toggle button state
            this.value.forEach(item => {
                this.select(item);
            });
        }
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
            this._onModelChange(this.value);
        }

        if (this._onTouch) {
            this._onTouch(this.value);
        }

        this.cd.markForCheck();
    }
}
