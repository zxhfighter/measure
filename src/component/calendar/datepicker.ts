import {
    Component, Input, Output, EventEmitter, Renderer2, OnDestroy, ViewChild, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {Moment} from 'moment';
import * as moment from 'moment';
import {Element} from 'glob-stream';

import {OnChange} from '../core/decorators';

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
        'class': 'nb-widget nb-datepicker',
        '(click)': 'onClickDatePicker($event)'
    }
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
     * show text in input box
     * @readonly
     * @docs-private
     */
    get valueText() {
        return moment(this.value).format('YYYY-MM-DD');
    }

    /** whether the panel is show */
    _showPanel: boolean = false;

    /** document click listener */
    _documentClickListener: any;

    @ViewChild('input') _input: ElementRef;
    @ViewChild('panel') _panel: ElementRef;

    constructor(private render: Renderer2, private cd: ChangeDetectorRef, private el: ElementRef) {

        // listen document click
        this._documentClickListener = this.render.listen('document', 'click', () => {
            this._showPanel = false;
            this.cd.markForCheck();
        });
    }

    ngOnInit() {}

    ngOnDestroy() {

        // remove global document click listener
        if (this._documentClickListener) {
            this._documentClickListener();
        }
    }

    onShowCalendar() {
        this._showPanel = true;
        this._setPanelPosition();
    }

    onHideCalendar() {
        this._showPanel = false;
    }

    onSelectDate(date: Date) {
        this.value = date;
        this.change.emit(this.value);
        this._showPanel = false;

        this._markForCheck();
    }

    _setPanelPosition() {
        try {
            const panel = this._panel.nativeElement as HTMLElement;
            const windowHeight = window.innerHeight;
            const rect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();

            this.render.setStyle(panel, 'opacity', 0);
            setTimeout(() => {
                const panelRec = panel.getBoundingClientRect();
                const up = rect.top > windowHeight / 2;
                this.render.setStyle(panel, 'top', (up ? -panelRec.height : 38) + 'px');
                this.render.setStyle(panel, 'opacity', 1);
            }, 100)
        }
        catch(e) {
            throw new Error('it only works in browser');
        }
    }

    /**
     * stop propagation, when click host, don't close panel
     * @param {MouseEvent} event - mouse event
     * @docs-private
     */
    onClickDatePicker(event: MouseEvent) {

        event.stopPropagation();
        event.stopImmediatePropagation();
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
