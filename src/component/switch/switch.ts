import {
    Component, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2,
    ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, forwardRef, ChangeDetectorRef
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
    exportAs: 'nbSwitch'
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

    @ViewChild('checkbox') _checkbox: ElementRef;
    @ViewChild('innerbar') _innerbar: ElementRef;
    @ViewChild('outerbar') _outerbar: ElementRef;

    _dragging: boolean = false;
    _outerbarWidth: number;
    _innerbarWidth: number;
    _dragPercentage: number;

    constructor(private _el: ElementRef, private _render: Renderer2, private _cd: ChangeDetectorRef) { }

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
    _onChange(event: Event) {
        if (this.disabled) {
            return;
        }

        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the component's `change` output.
        event.stopPropagation();

        this.checked = this._checkbox.nativeElement.checked;
        this.change.emit(this.checked);

        // update form model
        this.updateFormModel();
    }

    _onInputClick(event: MouseEvent) {
        if (this._dragging) {
            event.preventDefault();
        }

        event.stopPropagation();
    }

    _onDragStart() {
        if (this.disabled || this._dragging) {
            return;
        }

        this._outerbarWidth = this._outerbar.nativeElement.clientWidth;
        this._innerbarWidth = this._innerbar.nativeElement.clientWidth;
        this._dragging = true;
    }

    _onDrag(dragEvent: any) {
        this._updateInnerBarPosition(dragEvent.deltaX);
    }

    _onDragEnd() {

        if (this._dragging) {
            this.checked = this._dragPercentage > 50;

            this.change.emit(this.checked);

            // update form model
            this.updateFormModel();

            setTimeout(() => {
                this._dragging = false;
                this._render.setStyle(this._innerbar.nativeElement, 'transform', '');
                this._cd.markForCheck();
            });
        }
    }

    _updateInnerBarPosition(deltaX: number) {
        this._dragPercentage = this._getDragPercentage(deltaX);
        let dragX = (this._dragPercentage / 100) * (this._outerbarWidth - this._innerbarWidth - 4);
        this._render.setStyle(this._innerbar.nativeElement, 'transform', `translate3d(${dragX}px, 0, 0)`);
        this._render.setStyle(this._innerbar.nativeElement, 'webkitTransform', `translate3d(${dragX}px, 0, 0)`);
    }

    _getDragPercentage(distance: number) {
        let percentage = (distance / (this._outerbarWidth - this._innerbarWidth - 4)) * 100;

        if (this.checked) {
            percentage += 100;
        }

        return Math.max(0, Math.min(percentage, 100));
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
