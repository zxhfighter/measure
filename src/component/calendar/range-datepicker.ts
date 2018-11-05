/**
 * xdesign
 *
 * @file date range picker
 * @author csu.zengxiaohui@gmail.com
 */

import {
    Component, Input, Output, EventEmitter, Renderer2, OnDestroy, ViewChild, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OverlayComponent } from '../overlay';
import { OverlayOriginDirective } from '../overlay/overlay-origin.directive';

import { Moment } from 'moment';
import * as momentLib from 'moment';

import { OnChange } from '../core/decorators';

// fix rollup bundle bug, see
// https://stackoverflow.com/questions/39519823/using-rollup-for-angular-2s-aot-compiler-and-importing-moment-js
const moment = (momentLib as any).default ? (momentLib as any).default : momentLib;

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const RANGEDATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangeDatePickerComponent),
    multi: true
};

/**
 * range datepicker value interface
 */
export interface RangeDatePickerValue {
    startDate: Date;
    endDate: Date;
}

/**
 * quick linker value interface
 */
export interface QuickLinkValue {
    text: string;
    startDate: Date;
    endDate: Date;
    selected?: boolean;
}

/**
 * Range DatePicker Component
 */
@Component({
    selector: 'nb-range-datepicker',
    templateUrl: './range-datepicker.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RANGEDATEPICKER_VALUE_ACCESSOR],
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-rangedatepicker',
        '[class.disabled]': 'disabled'
    },
    exportAs: 'nbRangeDatePicker'
})
export class RangeDatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

    /** range datepicker change event, emit a `RangeDatePickerValue` value */
    @Output() change: EventEmitter<RangeDatePickerValue> = new EventEmitter<RangeDatePickerValue>();

    /** range datepicker value */
    @Input()
    get value() { return this._value; }
    set value(newValue: any) {

        if (newValue) {
            this._value = newValue;
            this._startDate = newValue.startDate;
            this._endDate = newValue.endDate;
        }
    }
    private _value: RangeDatePickerValue = {
        startDate: new Date(),
        endDate: new Date()
    };

    /** the splitter symbol between two dates show in input text */
    @Input() splitter = '~';

    /** the format date show */
    @Input() formatter = 'YYYY-MM-DD';

    /** the quick links array */
    @Input() quickLinks: QuickLinkValue[] = [
        {
            text: '昨天',
            startDate: moment().subtract(1, 'd').toDate(),
            endDate: moment().subtract(1, 'd').toDate()
        },
        {
            text: '今天',
            startDate: new Date(),
            endDate: new Date()
        },
        {
            // not include today
            text: '最近7天',
            startDate: moment().subtract(7, 'd').toDate(),
            endDate: moment().subtract(1, 'd').toDate(),
        },
        {
            text: '上周',
            startDate: moment().subtract(1, 'w').day(1).toDate(),
            endDate: moment().subtract(1, 'w').day(7).toDate()
        },
        {
            text: '本月',
            startDate: moment().date(1).toDate(),
            endDate: moment().add(1, 'month').date(1).subtract(1, 'd').toDate()
        }
    ];

    /** whether the range datepicker is disabled */
    @OnChange(true)
    @Input()
    disabled: boolean = false;

    /**
     * the strategy function which used to check weather the date is disabled
     */
    @Input() disabledStrategy: (date: Date) => boolean;

    /**
     * get the text show in input box
     * @readonly
     * @docs-private
     */
    get valueText() {
        return [
            moment(this.value.startDate).format(this.formatter),
            ' ' + this.splitter + ' ',
            moment(this.value.endDate).format(this.formatter)
        ].join('');
    }

    /** whether the panel is show */
    _showPanel: boolean = false;

    /** the start date(the min date of the two dates) */
    _startDate: Date | null;

    /** the end date(the max date of the two dates) */
    _endDate: Date | null;

    @ViewChild('origin') origin: OverlayOriginDirective;
    @ViewChild('overlay') overlay: OverlayComponent;

    constructor(private render: Renderer2, private cd: ChangeDetectorRef, private el: ElementRef) {

    }

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

    onFilterPanelHide(_panel: any) {
        this._showPanel = false;
    }

    onSelectStartDate(date: Date) {
        this.value.startDate = date;
        this.setStartAndEndDate(date);
    }

    onSelectEndDate(date: Date) {
        this.value.endDate = date;
        this.setStartAndEndDate(date);
    }

    /**
     * set range datepicker start and end date range
     * @param {Date} date - currently selected date
     * @docs-private
     */
    setStartAndEndDate(date: Date) {

        // if all have set, reset start date and set end date to null
        if (this._startDate && this._endDate) {
            this._startDate = date;
            this._endDate = null;
            return;
        }

        // if no start date, set this date as a start date
        if (!this._startDate) {
            this._startDate = date;
            return;
        }

        // if no end date(already has a start date), set this date as a end date
        if (!this._endDate) {
            this._endDate = date;

            // make sure that start date is smaller than end date, if not, exchange
            const max = Math.max(+this._startDate, +this._endDate);
            const min = Math.min(+this._startDate, +this._endDate);
            this.value.startDate = new Date(min);
            this.value.endDate = new Date(max);
        }
    }

    /**
     * quickly set date range
     * @param {QuickLinkValue} quickLink - quick link item
     * @docs-private
     */
    onClickQuickLink(quickLink: QuickLinkValue) {
        if (this.disabled) {
            return;
        }

        this.quickLinks.forEach(v => v.selected = false);
        quickLink.selected = true;

        // set selection range
        this._startDate = quickLink.startDate;
        this._endDate = quickLink.endDate;

        // set value
        this.value.startDate = quickLink.startDate;
        this.value.endDate = quickLink.endDate;
    }

    /**
     * confirm range value
     * @docs-private
     */
    onConfirm() {
        this._exchangeValueIfNesscery(this.value);
        this.change.emit(this.value);

        // reset highlight range start
        this._startDate = this.value.startDate;
        this._endDate = this.value.endDate;

        this._hideOverlay();
        this._markForCheck();
    }

    /**
     * make sure startDate is less than endDate
     * @param value
     */
    _exchangeValueIfNesscery(value: RangeDatePickerValue) {
        const startDate = +value.startDate;
        const endDate = +value.endDate;
        const max = Math.max(startDate, endDate);
        const min = Math.min(startDate, endDate);
        this.value.startDate = new Date(min);
        this.value.endDate = new Date(max);
    }

    /**
     * hide panel
     * @docs-private
     */
    onCancel() {
        this._hideOverlay();
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
