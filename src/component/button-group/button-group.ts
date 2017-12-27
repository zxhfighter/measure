import {
    Component, Input, Output, ContentChildren, OnInit, ViewChildren,
    ViewEncapsulation, ChangeDetectionStrategy,
    QueryList, Optional, forwardRef, EventEmitter, AfterContentInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OnChange } from '../core/decorators';

/** toggle button value type */
export interface ButtonGroupValue {
    /** current toggle button value */
    currentValue: any;

    /** all toogled button value, this is usually an array */
    value: any;
}

/** toogle button group item type */
export interface ButtongGroupItem {
    value: string;
    text: string;
    checked?: boolean;
    disabled?: boolean;
}

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const BUTTONGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonGroupComponent),
    multi: true
};

/**
 * Button Group Component
 */
@Component({
    selector: 'nb-button-group',
    templateUrl: './button-group.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [BUTTONGROUP_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-button-group'
    },
    exportAs: 'nbButtonGroup'
})
export class ButtonGroupComponent implements ControlValueAccessor, AfterContentInit, OnInit {

    /**
     * button group change event, emit the `ButtonGroupValue`
     * , which with the `currentValue` and `value` property
     */
    @Output() change: EventEmitter<ButtonGroupValue> = new EventEmitter<ButtonGroupValue>();

    /**
     * button group type, either 'radio' or 'checkbox'
     * @default checkbox
     */
    @Input() type: 'radio' | 'checkbox' = 'checkbox';

    /**
     * button group datasource, when datasource exists, the inner toggle buttons will be overwrited
     * using datasource, you can't use html tags in toggle button
     */
    @Input() datasource: ButtongGroupItem[];

    /**
     * button group value, can be any type
     */
    @Input() value: any;

    /**
     * Whether the button group is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled = false;

    /**
     * @docs-private
     */
    disabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * button toggle content children
     */
    @ContentChildren(
        forwardRef(() => ButtonToggleComponent)
    ) _contentButtonList: QueryList<ButtonToggleComponent>;

    /**
     * button toggle view children
     */
    @ViewChildren(
        forwardRef(() => ButtonToggleComponent)
    ) _viewButtonList: QueryList<ButtonToggleComponent>;

    ngOnInit() {
        const self = this;

        // listen to disabled property, and update children disabled state
        self.disabledChange.subscribe(disabled => {
            self._disableButtonList(disabled);
        });

        // update init value
        if (this.value && this.datasource) {
            this.datasource.forEach(item => {
                item.checked = item.checked || this.value.includes(item.value);

                // update checked value
                if (item.checked) {
                    this.value = Array.from(new Set(this.value).add(item.value));
                }
            });
        }
    }

    ngAfterContentInit() {
        this._disableButtonList(this.disabled);
    }

    _disableButtonList(groupDisabled: boolean) {
        const self = this;
        const buttonList = this._getButtonList();
        if (buttonList) {
            buttonList.forEach(button => {
                button.disabled = button.disabled || groupDisabled;
            });
        }
    }

    _getButtonList() {
        const hasDatasource = this.datasource && this.datasource.length;
        return hasDatasource ? this._viewButtonList : this._contentButtonList;
    }

    /**
     * set children toggle button checked state
     *
     * @param {any} value - current toggle button value
     * @docs-private
     */
    select(value: any) {
        const buttonList = this._getButtonList();
        if (this.type === 'radio') {
            buttonList.forEach(item => {
                item.checked = item.value === value;
            });
            this.value = [value];
        }
        else if (this.type === 'checkbox') {
            const button = buttonList.find(v => v.value === value);
            const valueSet = new Set(this.value);
            if (button) {
                button.checked = !button.checked;
                button.checked ? valueSet.add(value) : valueSet.delete(value);
                this.value = Array.from(valueSet);
            }
        }

        this.change.emit({
            currentValue: value,
            value: this.value
        });
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
    }

    /**
     * update form model value and mark for check
     */
    _updateFormModel() {
        if (this._onModelChange) { this._onModelChange(this.value); }
        if (this._onTouch) { this._onTouch(this.value); }
    }
}

/**
 * A single toggle button, usually used in `nb-button-group`,
 * like checkbox, it has a associated value and can be checked and disabled
 */
@Component({
    selector: 'nb-button-toggle',
    template: `
        <span class="nb-button-inner"><ng-content></ng-content></span>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-button-toggle',
        '[class.nb-button-toggle-checked]': 'checked',
        '[class.nb-button-toggle-disabled]': 'disabled',
        '(click)': 'onToggle()'
    },
    exportAs: 'nbButtonToggle'
})
export class ButtonToggleComponent {

    /** toggle event, emit a boolean value */
    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * toggle button's value, can be any type
     * @default ''
     */
    @Input() value: any = '';

    /**
     * Whether toggle button is checked
     * @default false
     */
    @OnChange(true)
    @Input() checked: boolean = false;

    /**
     * Whether toggle button is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /**
     * Reference to the wrapped parent button group component
     * @docs-private
     */
    buttonGroup: ButtonGroupComponent;

    /**
     * Creates an instance of ButtonToggleComponent.
     * @param {ButtonGroupComponent?} buttonGroup - the optional wrapped parent button group component
     */
    constructor( @Optional() buttonGroup: ButtonGroupComponent) {
        this.buttonGroup = buttonGroup;
    }

    /**
     * Toggle event
     *
     * @docs-private
     */
    onToggle() {
        if (this.disabled) { return; }

        // if not a single toggle button, tell the parent button group component
        // to toggle proper buttons according to type
        if (this.buttonGroup) {
            this.buttonGroup.select(this.value);
        }
        // if a single toggle button, just emit the toggle event
        else {
            this.checked = !this.checked;
            this.toggle.emit(this.checked);
        }
    }
}
