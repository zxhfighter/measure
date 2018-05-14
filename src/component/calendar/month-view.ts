import {
    Component, Input, Output, EventEmitter, ChangeDetectorRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import * as momentLib from 'moment';
import { Moment } from 'moment';
import 'moment/locale/zh-cn';
import { OnChange } from '../core/decorators';

const moment = (momentLib as any).default ? (momentLib as any).default : momentLib;


/** day item cell type */
export interface DayItem {

    /** cell text */
    text: string;

    /** cell date */
    date: Moment;

    /** whether cell is disabled */
    disabled: boolean;

    /** cell title */
    title: string;

    /** whether cell is today */
    isCurrent: boolean;

    /** whether cell is selected */
    isSelected: boolean;

    /** whether cell is belong to last month */
    isLastMonth: boolean;

    /** whether cell is belong to next month */
    isNextMonth: boolean;
}

/** month weeks */
export interface WeekItem {
    days: Array<DayItem>;
}

/** nullable date type */
export type DateType = Date | null;

/** weekdays */
export enum Weekday {
    Sunday,
    Monday,
    Tuesday,
    Wensday,
    Thursday,
    Friday,
    Saturday
}

/**
 * Month View Component
 */
@Component({
    selector: 'nb-month-view',
    templateUrl: './month-view.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-month-view'
    },
    exportAs: 'nbMonthView'
})
export class MonthViewComponent implements OnInit {

    /** monthview selected event, emit the selected date */
    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Whether the month view allows range selection, defaults to false
     * @default false
     */
    @OnChange(true)
    @Input() multiple: boolean = false;

    /**
     * single monthview selected date(when the month view is not multiple)
     * @default new Date()
     */
    @Input()
    get value() { return this._value; }
    set value(v: any) {
        this._value = v;
        this._month = v;
        this._buildWeeks();
    }
    private _value: Date = new Date();

    /**
     * the selection start date in multiple mode
     */
    @Input()
    get startDate() { return this._startDate; }
    set startDate(newStartDate: any) {
        if (this._startDate !== newStartDate) {
            this._startDate = newStartDate;
            this._buildWeeks();
        }
    }
    private _startDate: DateType;

    /**
     * the selection end date in multiple mode
     */
    @Input()
    get endDate() { return this._endDate; }
    set endDate(newEndDate: any) {
        if (this._endDate !== newEndDate) {
            this._endDate = newEndDate;
            this._buildWeeks();
        }
    }
    private _endDate: DateType;

    /**
     * the current month date of the selected date
     * @default new Date()
     */
    @Input()
    get month() { return this._month; }
    set month(v: any) {
        this._month = v;
        this._buildWeeks();
    }
    private _month: Date = new Date();

    /**
     * the first day of the week, default to 0(Sunday), here we set to 1(Monday)
     * @default Weekday.Monday
     */
    @Input() firstDayOfWeek: number = Weekday.Monday;

    /**
     * A array of disabled dates that can't be selected, date format is: `'2017-01-01'`
     * @default []
     */
    @Input() disabledDates: string[] = [];

    /**
     * the strategy function which used to check weather the date is disabled
     */
    @Input() disabledStrategy: (date: Date) => boolean;

    /**
     * whether the month view is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /**
     * monthview locale
     * @docs-private
     */
    _locale: string = 'zh-cn';

    /**
     * monthview locale weeknames
     * @docs-private
     */
    _weekNames: string[] = [];

    /**
     * monthview weeks
     * @docs-private
     */
    _weeks: WeekItem[] = [];

    /**
     * the last mouse over day cell
     */
    _lastMouseOverDay: Moment;

    /** whether the range selection is done */
    _isDone: boolean = false;

    /** the temp end date when mouse over */
    _tempEndDate: DateType;

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit() {
        // set locale to zh-cn
        moment.locale(this._locale);

        // set weekday names
        this._weekNames = this._getWeekNames();

        // if set start date and end date, set isDone to true
        this._isDone = this.startDate && this.endDate;

        // init build calendar
        this._buildWeeks();
    }

    /**
     * get locale week day names
     */
    _getWeekNames() {
        let weekdays: string[] = moment.weekdaysMin();
        return this.shiftArray(weekdays, this.firstDayOfWeek);
    }

    /**
     * build month weeks according to the month
     */
    _buildWeeks() {
        this._weeks = this._buildMonthWeeks(moment(this.month));
    }

    /**
     * build month weeks
     * @param {Moment?} d - moment
     * @return {WeekItem[]} month weeks
     */
    _buildMonthWeeks(d?: Moment): WeekItem[] {
        if (!d) {
            // no date info, set today
            d = moment();
        }

        const weeks: WeekItem[] = [];
        const rawDate = this._resetTime(d || moment());

        // get the first day of the first week of the month
        const start = rawDate.clone().date(1).day(this.firstDayOfWeek - 7);
        const month = rawDate.clone();
        const date = start.clone();

        let done = false;
        let count = 0;

        while (!done) {
            weeks.push({
                days: this._buildWeek(date.clone(), month)
            });

            // add a week
            date.add(1, 'w');
            done = (count++) > 4;
        }

        // if first row week days all belong to last month, remove it
        const lastWeekDays = weeks[0].days;
        if (lastWeekDays[lastWeekDays.length - 1].isLastMonth) {
            weeks.shift();
        }

        // if last row week days all belong to next month, remove it
        if (weeks[weeks.length - 1].days[0].isNextMonth) {
            weeks.pop();
        }

        return weeks;
    }

    /**
     * get week day items
     * @param {Moment} date - current date
     * @param {Moment} month - current date
     * @return {DayItem[]} week day items
     */
    _buildWeek(date: Moment, month: Moment): DayItem[] {
        const days: DayItem[] = [];
        const needCheckSelected = this.multiple || (this.startDate && this.endDate);
        for (let i = 0; i < 7; i++) {
            days.push({
                text: date.date() + '',
                date,
                disabled: this.checkIsDisabled(date),
                title: date.format('YYYY-MM-DD'),
                isCurrent: date.isSame(new Date, 'day'),
                isSelected: needCheckSelected ? this.checkIsSelected(date) : date.isSame(this.value, 'day'),
                isLastMonth: date.month() < month.month(),
                isNextMonth: date.month() > month.month()
            });
            date = date.clone();

            // add a day
            date.add(1, 'd');
        }
        return days;
    }

    /**
     * in multiple mode, check the day item's selected state
     * @param {Moment} date - current day item
     * @return {boolean} whether the day item is selected
     * @docs-private
     */
    checkIsSelected(date: Moment): boolean {
        // if the day item is disabled, return false
        if (this.checkIsDisabled(date)) {
            return false;
        }

        const endDate = (this._isDone || !this.multiple) ? this.endDate : this._tempEndDate;

        if (this.startDate && endDate) {

            const max = Math.max(+this.startDate, +endDate);
            const min = Math.min(+this.startDate, +endDate);

            return date.isSame(moment(min), 'day')
                || date.isSame(moment(max), 'day')
                || date.isBetween(moment(min), moment(max));
        }

        return false;
    }


    /**
     * Check whether the day item is disabled
     * @param {Moment} date - current day item
     * @return {boolean} true if disabled
     * @docs-private
     */
    checkIsDisabled(date: Moment): boolean {

        if (this.disabledStrategy && typeof this.disabledStrategy === 'function') {
            return this.disabledStrategy(date.toDate());
        }
        else if (this.disabledDates) {
            return this.disabledDates.some((d: string) => {
                const disabledDate = moment(d);
                return date.isSame(disabledDate, 'day');
            });
        }

        return false;
    }

    /**
     * reset date hour、minute and so on
     * @param {Moment} date - current day item
     */
    _resetTime(date: Moment) {
        return date.hour(0).minute(0).second(0).millisecond(0);
    }

    /**
     * adjust the first day of the week
     * @param {T[]} t - array
     * @param {number} distance - the distance for the shift
     * @docs-private
     */
    shiftArray<T>(t: T[], distance: number): T[] {
        const headArray = t.slice(0, distance);
        const tailArray = t.slice(distance);

        return [...tailArray, ...headArray];
    }

    /**
     * the day click event
     * @param {DayItem} day - day item
     * @docs-private
     */
    onClick(day: DayItem) {
        if (day.disabled || this.disabled) {
            return;
        }

        // update the selected date
        this.value = day.date.toDate();

        // in multiple range selection mode
        if (this.multiple) {
            // set start date
            if (!this.startDate) {
                this.startDate = this.value;
                this.endDate = null;
                this._isDone = false;
            }
            // set end date
            else if (this.startDate && !this.endDate) {
                this.endDate = this.value;

                this.select.emit({
                    startDate: this.startDate,
                    endDate: this.endDate
                });

                this._isDone = true;
            }
            // reset end date
            else if (this.startDate && this.endDate) {
                this.startDate = this.value;
                this.endDate = null;
                this._isDone = false;
            }
        }
        else {
            this._buildWeeks();

            // emit the selected date
            this.select.emit(this.value);
        }
    }

    /**
     * cell mouse over event
     * @param {DayItem} day - day item
     * @docs-private
     */
    onMouseOver(day: DayItem) {

        if (day.disabled || this.disabled) {
            return;
        }

        // only works for multiple mode
        if (this.multiple) {

            // if it's the last cell day, just return
            if (this._lastMouseOverDay) {
                if (this._lastMouseOverDay.isSame(day.date, 'day')) {
                    return;
                }
            }

            // if there is start date and no end date, update cell selected
            if (this.startDate && !this._isDone) {
                this._lastMouseOverDay = day.date;

                this._tempEndDate = day.date.toDate();
                this._buildWeeks();
            }
        }
    }
}
