import {
    Component, Input, Output, EventEmitter, ChangeDetectorRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import { OnChange } from '../core/decorators';
import {
    format, addWeeks, isSameDay, addDays, setDay, setDate, isWithinInterval
} from 'date-fns';
import { getDayNames, Weekday, resetTime, cloneDate } from '../util/date';

/** day item cell type */
export interface DayItem {

    /** cell text */
    text: string;

    /** cell date */
    date: Date;

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
    _lastMouseOverDay: Date;

    /** whether the range selection is done */
    _isDone: boolean = false;

    /** the temp end date when mouse over */
    _tempEndDate: DateType;

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit() {
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
        return getDayNames(this.firstDayOfWeek);
    }

    /**
     * build month weeks according to the month
     */
    _buildWeeks() {
        this._weeks = this._buildMonthWeeks(this.month);
    }

    /**
     * build month weeks
     * @param d? - current date
     * @return month weeks
     */
    _buildMonthWeeks(d?: Date): WeekItem[] {
        d = d || new Date();
        const weeks: WeekItem[] = [];
        const rawDate = resetTime(d);

        // get the first day of the first week of the month
        const start = setDay(setDate(d, 1), -6, { weekStartsOn: 1 });
        const month = cloneDate(rawDate);
        let date = cloneDate(start);

        let done = false;
        let count = 0;

        while (!done) {
            weeks.push({
                days: this._buildWeek(cloneDate(date), month)
            });

            // add a week
            date = addWeeks(date, 1);
            done = (count++) > 5;
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
     * @param date - current date
     * @param {Date} month - current date
     * @return {DayItem[]} week day items
     */
    _buildWeek(date: Date, month: Date): DayItem[] {
        const days: DayItem[] = [];
        const needCheckSelected = this.multiple || (this.startDate && this.endDate);
        for (let i = 0; i < 7; i++) {
            days.push({
                text: date.getDate() + '',
                date,
                disabled: this.checkIsDisabled(date),
                title: format(date, 'yyyy-MM-dd'),
                isCurrent: isSameDay(date, new Date()),
                isSelected: needCheckSelected ? this.checkIsSelected(date) : isSameDay(date, this.value),
                isLastMonth:
                    (date.getMonth() < month.getMonth())
                    || (
                        date.getMonth() > month.getMonth()
                        && date.getFullYear() < month.getFullYear()
                    ),
                isNextMonth:
                    (date.getMonth() > month.getMonth())
                    || (
                        date.getMonth() < month.getMonth()
                        && date.getFullYear() > month.getFullYear()
                    )
            });
            date = cloneDate(date);

            // add a day
            date = addDays(date, 1);
        }
        return days;
    }

    /**
     * in multiple mode, check the day item's selected state
     * @param {Date} date - current day item
     * @return {boolean} whether the day item is selected
     * @docs-private
     */
    checkIsSelected(date: Date): boolean {
        // if the day item is disabled, return false
        if (this.checkIsDisabled(date)) {
            return false;
        }

        const endDate = (this._isDone || !this.multiple) ? this.endDate : this._tempEndDate;

        if (this.startDate && endDate) {

            const max = Math.max(+this.startDate, +endDate);
            const min = Math.min(+this.startDate, +endDate);

            return isSameDay(date, min)
                || isSameDay(date, max)
                || isWithinInterval(date, {start: min, end: max});
        }

        return false;
    }


    /**
     * Check whether the day item is disabled
     * @param date - current day item
     * @return {boolean} true if disabled
     * @docs-private
     */
    checkIsDisabled(date: Date): boolean {

        if (this.disabledStrategy && typeof this.disabledStrategy === 'function') {
            return this.disabledStrategy(date);
        }
        else if (this.disabledDates) {
            return this.disabledDates.some((d: string) => {
                const disabledDate = new Date(d);
                return isSameDay(date, disabledDate);
            });
        }

        return false;
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
        this.value = day.date;

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
                if (isSameDay(this._lastMouseOverDay, day.date)) {
                    return;
                }
            }

            // if there is start date and no end date, update cell selected
            if (this.startDate && !this._isDone) {
                this._lastMouseOverDay = day.date;

                this._tempEndDate = day.date;
                this._buildWeeks();
            }
        }
    }
}
