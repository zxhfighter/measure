import {
    Component, Input, ElementRef, SimpleChanges, AfterViewInit, ContentChildren,
    OnChanges, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    QueryList, Renderer2, Optional, forwardRef, Output, EventEmitter
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {coerceBooleanProperty} from '../util/coerce';

export type BUTTON_GROUP_TYPE = 'radio' | 'checkbox';

/*
 * Provider Expression that allows x-switch to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const BUTTONGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonGroupComponent),
    multi: true
};

/**
 * Button Component
 */
@Component({
    selector: 'x-button-group',
    templateUrl: './button-group.html',
    styleUrls: ['./button-group.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [BUTTONGROUP_VALUE_ACCESSOR],
    host: {
        'class': 'x-widget x-button-group'
    },
    exportAs: 'xButtonGroup'
})
export class ButtonGroupComponent implements OnChanges, AfterViewInit, ControlValueAccessor {

    @Output() change: EventEmitter<any[]> = new EventEmitter<any[]>();

    _value: any[] = [];

    @Input() get value() {
        return this._value;
    }

    set value(value: any[]) {
        if (value) {
            this._value = value;
        }
    }

    _type: BUTTON_GROUP_TYPE;

    @Input() get type() {
        return this._type;
    }

    set type(value: any) {
        if (value) {
            this._type = value;
        }
    }

    private _disabled = false;

    /** button disabled state */
    @Input() get disabled() {
        return this._disabled;
    }

    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }

    @ContentChildren(forwardRef(() => ButtonToggleComponent))
    _buttonList: QueryList<ButtonToggleComponent>;


    constructor(private renderer: Renderer2, private cd: ChangeDetectorRef) {}

    ngOnChanges() {

    }

    ngAfterViewInit() {

    }

    select(value: any) {
        if (this.type === 'radio') {
            this._buttonList.forEach(item => {
                item.checked = item.value === value;
            });
            this.value = [value];
            this.change.emit(this.value);
            this._markForCheck();
        }
        else if (this.type === 'checkbox') {
            const button = this._buttonList.find(v => v.value === value);
            const valueSet = new Set(this.value);
            if (button) {
                button.checked = !button.checked;
                button.checked ? valueSet.add(value) : valueSet.delete(value);
                this.value = Array.from(valueSet);
                this.change.emit(this.value);
                this._markForCheck();
            }
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

@Component({
    selector: 'x-button-toggle',
    template: `
        <span class="x-button-inner"><ng-content></ng-content></span>
    `,
    styleUrls: ['./button-group.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'x-widget x-button-toggle',
        '[class.x-button-toggle-checked]': 'checked',
        '[class.x-button-toggle-disabled]': 'disabled',
        '(click)': 'onClick()'
    },
    exportAs: 'xButtonToggle'
})
export class ButtonToggleComponent {

    @Input() value = '';
    @Input() checked = false;


    _isSingleSelector = true;
    buttonGroup: ButtonGroupComponent;

    _disabled = false;

    get disabled() {
        return this._disabled;
    }

    @Input()
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }

    constructor( @Optional() buttonGroup: ButtonGroupComponent) {
        this.buttonGroup = buttonGroup;

        if (buttonGroup) {
            this._isSingleSelector = false;
        }
        else {
            this._isSingleSelector = true;
        }
    }

    onClick() {
        if (this.disabled) {
            return;
        }

        if (!this._isSingleSelector) {
            const groupType = this.buttonGroup && this.buttonGroup.type;
            if (groupType === 'checkbox') {
                this.buttonGroup.select(this.value);
            }
            else if (groupType === 'radio') {
                this.buttonGroup.select(this.value);
            }
        }
        else {
            this.checked = !this.checked;
        }
    }
}
