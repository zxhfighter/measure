import {
    Component, Input, Output, EventEmitter, ContentChildren, QueryList, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, ViewChildren,
    AfterViewChecked, ChangeDetectorRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {InputBoxComponent} from './box';
import {coerceBooleanProperty} from '../util/coerce';

/** box group type */
export type BOX_GROUP_TYPE = 'radio' | 'checkbox';

/** box group value type */
export interface BoxGroupValue {
    /** current box value */
    currentValue: any;

    /** all box group value, this is usually an array */
    value: any;
}

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const BUTTONGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BoxGroupComponent),
    multi: true
};


@Component({
    selector: 'x-boxgroup',
    templateUrl: './box-group.html',
    styleUrls: ['./box-group.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [BUTTONGROUP_VALUE_ACCESSOR],
    host: {
        'class': 'x-widget x-boxgroup',
        '[class.x-boxgroup-disabled]': 'disabled'
    }
})
export class BoxGroupComponent implements ControlValueAccessor, AfterViewInit {

    /** when box group checked value change, emit a change event */
    @Output() change: EventEmitter<BoxGroupValue> = new EventEmitter<BoxGroupValue>();

    /** box group type, 'checkbox' or 'radio' */
    private _type: BOX_GROUP_TYPE = 'checkbox';
    @Input() get type() {return this._type};
    set type(value: any) {
        if (value) {
            this._type = value;
        }
    }

    /** Whether the box group is disabled */
    private _disabled: boolean = false;
    @Input() get disabled() {return this._disabled};
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);

        if (this._boxList) {
            this._boxList.forEach(item => {
                item.disabled = this._disabled;
            });
        }
    }

    /** the value associated with the box group */
    private _value: any;
    @Input() get value() {return this._value};
    set value(value: any) {
        this._value = value;
    }

    /** the unique name of the box group */
    _uuid = Math.random().toString(16).slice(2, 8);
    get uuid() {return this._uuid;}
    set uuid(value: any) {this._uuid = value};

    /** children box components */
    @ContentChildren(forwardRef(() => InputBoxComponent)) _boxList: QueryList<InputBoxComponent>;

    constructor(private cd: ChangeDetectorRef) {}

    /** select some value, according to the type, change sub box component behavior */
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
            const button = this._boxList.find(v => v.value === value);
            const valueSet = new Set(this.value);
            if (button) {
                button.checked = !button.checked;
                button.checked ? valueSet.add(value) : valueSet.delete(value);
                this.value = Array.from(valueSet);
                this.change.emit({
                    currentValue: value,
                    value: this.value
                });
            }
        }

        this._markForCheck();
    }

    ngAfterViewInit() {

        console.log('xxx');

        if (this.value && this.value.length) {
            setTimeout(() => {
                // when init, set children toggle button state
                this.value.forEach(item => {
                    this.select(item);
                });
            }, 100);
        }

        if (this.disabled) {
            setTimeout(() => {
                this._boxList.forEach(item => {
                    item.disabled = this._disabled;
                });
            }, 100);
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
