import {
    Component, Input, Output, EventEmitter, Renderer2, OnDestroy, ViewChild, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OverlayComponent } from '../overlay';
import { OverlayOriginDirective } from '../overlay/overlay-origin.directive';

import * as momentLib from 'moment';
import { OnChange } from '../core/decorators';

const moment = (momentLib as any).default ? (momentLib as any).default : momentLib;

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
};

/**
 * DatePicker Component
 */
@Component({
    selector: 'nb-datepicker',
    templateUrl: './datepicker.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [DATEPICKER_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-datepicker'
    },
    exportAs: 'nbDatePicker'
})
export class DatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

    /** datepicker change event */
    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    /**
     * selected date
     */
    @Input() value: Date = new Date();

    /** whether the datepicker is disabled */
    @OnChange(true)
    @Input()
    disabled: boolean = false;

    /**
     * the strategy function which used to check weather the date is disabled
     */
    @Input() disabledStrategy: (date: Date) => boolean;

    /**
     * show text in input box
     * @readonly
     * @docs-private
     */
    get valueText() {
        return moment(this.value).format('YYYY-MM-DD');
    }

    /** whether the panel is show */
    _showPanel: boolean = false;

    @ViewChild('origin') origin: OverlayOriginDirective;
    @ViewChild('overlay') overlay: OverlayComponent;

    constructor(
        private render: Renderer2,
        private cd: ChangeDetectorRef,
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.overlay.origin = this.origin;
    }

    ngOnDestroy() {

    }

    onShowCalendar() {
        if (this._showPanel) {
            this._hideOverlay();
        }
        else {
            if (!this.disabled) {
                this._showOverlay();
            }
        }
    }

    _hideOverlay() {
        this.overlay.hide();
        this._showPanel = false;
    }

    _showOverlay() {
        this.overlay.show();
        this._showPanel = true;
    }

    onSelectDate(date: Date) {
        this.value = date;
        this.change.emit(this.value);

        this._hideOverlay();
        this._markForCheck();
    }

    onFilterPanelHide(_panel: any) {
        this._showPanel = false;
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
            this.cd.markForCheck();
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

        this.cd.markForCheck();
    }
}
