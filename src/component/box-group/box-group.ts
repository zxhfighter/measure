import {
    Component, Input, Output, EventEmitter, ContentChildren, QueryList, forwardRef,
    ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputBoxComponent } from './box';
import { uuid as getUUID } from '../util/uuid';
import { OnChange } from '../core/decorators';

/** box group value type */
export interface BoxGroupValue {
    /** current changed box value */
    currentValue: any;

    /** all box group value, usually an array */
    value: any[];
}

/** box group item type */
export interface BoxGroupItem {
    value: string | number;
    text: string;
    checked?: boolean;
    disabled?: boolean;
    [key: string]: any;
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
    },
    exportAs: 'nbBoxGroup'
})
export class BoxGroupComponent implements ControlValueAccessor, OnInit {

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
     * box group datasource, when datasource exists, the inner boxes will be overwrited
     */
    @Input() datasource: BoxGroupItem[];

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
    @ContentChildren(
        forwardRef(() => InputBoxComponent)
    ) _contentBoxList: QueryList<InputBoxComponent>;

    /**
     * button toggle view children
     */
    @ViewChildren(
        forwardRef(() => InputBoxComponent)
    ) _viewBoxList: QueryList<InputBoxComponent>;

    constructor(private _cd: ChangeDetectorRef) {

        // listen to disabled property, and update sub child disabled state
        this.disabledChange.subscribe(disabled => {
            const boxList = this._getBoxList();
            if (boxList) {
                boxList.forEach(box => {
                    box.disabled = disabled;
                });
            }
        });
    }

    ngOnInit() {

    }

    /**
     * select some value, according to the type, change sub box component behavior
     *
     * @param {any} value - box value
     * @docs-private
     */
    select(value: any) {
        const boxList = this._getBoxList();
        if (!boxList) {
            return;
        }

        if (this.type === 'radio') {
            boxList.forEach(item => {
                item.checked = (item.value + '') === (value + '');
            });
            this.value = [value];
            this.change.emit({
                currentValue: value,
                value: this.value
            });
        }
        else if (this.type === 'checkbox') {
            const box = boxList.find(v => (v.value + '') === (value + ''));

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

        this._cd.markForCheck();
        this._updateFormModel();
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
            this._forceUpdateValue(value);
        }
    }

    /**
     * force update box group value
     *
     * @param {any[]} value
     * @returns
     */
    _forceUpdateValue(value: any[]) {
        const boxList = this._getBoxList();
        if (!boxList) {
            return;
        }

        if (this.type === 'radio') {
            boxList.forEach(item => {
                item.checked = (item.value + '') === (value + '');
            });
        }
        else if (this.type === 'checkbox') {
            value = value.map(v => v + '');
            boxList.forEach(v => v.checked = value.includes(v.value + ''));
        }

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
            this._onModelChange(this.value);
        }

        if (this._onTouch) {
            this._onTouch(this.value);
        }
    }

    _getBoxList() {
        const hasDatasource = this.datasource && this.datasource.length;
        return hasDatasource ? this._viewBoxList : this._contentBoxList;
    }

    /**
     * reset box group value
     */
    reset() {
        this._getBoxList().forEach(box => {
            box.checked = false;
        });
        this.value = [];
    }
}
