import {
    Component, Input, Output, EventEmitter,
    ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { subMonths, addMonths, setYear, setMonth } from 'date-fns';
import { OnChange } from '../core/decorators';

/** calendar show mode */
export type CalendarMode = 'calendar' | 'year' | 'month';

/**
 * Calendar Component
 */
@Component({
    selector: 'nb-calendar',
    templateUrl: './calendar.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-calendar'
    },
    exportAs: 'nbCalendar'
})
export class CalendarComponent {

    /** calendar date change event, emit the selected date */
    @Output() select: EventEmitter<Date> = new EventEmitter<Date>();

    /**
     * calendar selected value
     * @default new Date()
     */
    @Input()
    get value() { return this._value; }
    set value(v: any) {
        this._value = v;
        this.month = v;
    }
    private _value: Date = new Date();

    /**
     * whether the calendar enable multiple selection
     * @default false
     */
    @Input() multiple: boolean = false;

    /**
     * calendar selection range start date
     */
    @Input() startDate: Date | null;

    /**
     * calendar selection range end date
     */
    @Input() endDate: Date | null;

    /**
     * whether the calendar is disabled
     * @default false
     */
    @OnChange(true)
    @Input()
    disabled: boolean = false;

    /**
     * the strategy function which used to check weather the date is disabled
     */
    @Input() disabledStrategy: (date: Date) => boolean;

    /**
     * calendar actived month date value
     * @docs-private
     */
    month: Date = new Date();

    /**
     * month array
     * @docs-private
     */
    monthArray: number[][] = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
    ];

    /**
     * year array
     * @docs-private
     */
    yearArray: number[][] = [];

    /**
     * currently calendar show mode, default 'calendar'
     * @docs-private
     */
    mode: CalendarMode = 'calendar';

    /**
     * in month select mode, reference the temp year
     * @docs-private
     */
    tempYear: number;

    constructor() {
        this.yearArray = this.getCurrentDecade(new Date());
        this.tempYear = new Date().getFullYear();
    }

    /**
     * the text title show in the year or month mode
     * @readonly
     * @docs-private
     */
    get yearMonthText(): string {
        if (this.mode === 'year') {
            const copyYears: number[] = [];
            for (const decade of this.yearArray) {
                copyYears.push(...decade);
            }
            return copyYears[0] + ' - ' + copyYears[copyYears.length - 1];
        }
        else if (this.mode === 'month') {
            return this.tempYear + '';
        }
        else {
            return '';
        }
    }

    /**
     * get the current decade years the year belong to
     * @param {Date} date - date
     * @docs-private
     */
    getCurrentDecade(date: Date): number[][] {
        const year = date.getFullYear();
        const years: number[][] = [];
        const columnWidth = 4;
        let temp: number[] = [];

        for (let i = 0; i < 10; i++) {
            temp.push(+((year + '').slice(0, 3) + i));
            if (temp.length % columnWidth === 0) {
                years.push(temp);
                temp = [];
            }

            if (i === 9) {
                years.push(temp);
            }
        }

        return years;
    }

    onShowYearPanel() {
        this.mode = 'year';
    }

    onShowMonthPanel() {
        this.mode = 'month';
    }

    onReturnCalendar() {
        this.mode = 'calendar';
    }

    /**
     * last event
     * @docs-private
     */
    onLast() {
        if (this.mode === 'year') {
            // get the first year
            const firstYear = this.yearArray[0][0];
            this.yearArray = this.getCurrentDecade(new Date(firstYear - 1, 0, 1));
        }
        else if (this.mode === 'month') {
            this.tempYear = this.tempYear - 1;
            this.yearArray = this.getCurrentDecade(new Date(this.tempYear, 0, 1));
        }
        else {
            this.month = subMonths(this.month, 1);
            this.tempYear = this.month.getFullYear();
            this.yearArray = this.getCurrentDecade(this.month);
        }
    }

    /**
     * next event
     * @docs-private
     */
    onNext() {
        if (this.mode === 'year') {
            // get the last year
            const lastYear = this.yearArray.reduce((a, b) => a.concat(b), []).pop()
                || new Date().getFullYear();

            // get next year decade
            this.yearArray = this.getCurrentDecade(new Date(lastYear + 1, 0, 1));
        }
        else if (this.mode === 'month') {
            this.tempYear = this.tempYear + 1;
            this.yearArray = this.getCurrentDecade(new Date(this.tempYear, 0, 1));
        }
        else {
            this.month = addMonths(this.month, 1);
            this.tempYear = this.month.getFullYear();
            this.yearArray = this.getCurrentDecade(this.month);
        }
    }

    /**
     * change year
     * @param {number} year - year
     * @docs-private
     */
    onSelectYear(year: number) {
        // currently show month date
        const date = this.month;
        const yearDate = setYear(date, year);

        // update currently show month date
        this.month = yearDate;
        this.tempYear = year;

        // return to calendar mode
        this.mode = 'calendar';
    }

    /**
     * change month
     * @param {number} month - month
     * @docs-private
     */
    onSelectMonth(month: number) {
        // currently show month date
        const date = this.month;
        const yearDate = setYear(date, this.tempYear);
        const monthDate = setMonth(yearDate, month - 1);

        // update currently show month date
        this.month = monthDate;

        // return to calendar mode
        this.mode = 'calendar';
    }

    /**
     * on select date
     * @param {Date} d - selected date
     * @docs-private
     */
    onSelectDate(d: Date) {
        this.value = d;
        this.select.emit(this.value);
    }

    isCurrentYear(year: number) {
        return this.month.getFullYear() === year;
    }

    isCurrentMonth(month: number) {
        return (this.month.getMonth() + 1) === month;
    }
}
