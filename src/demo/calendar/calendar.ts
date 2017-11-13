import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import * as moment from 'moment';

@Component({
    selector: 'demo-calendar',
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoCalendar implements OnInit {

    startDate = new Date();
    endDate = moment().add(7, 'd').toDate();

    monthes = [
        1,2,3,4,5,6,7,8,9,10,11,12
    ];

    _month: number = new Date().getMonth() + 1;
    get month() {return this._month;}
    set month(v: any) {
        this._month = v;
        this.selectedDate = new Date(this.year, this.month - 1, 1);
    }

    _year: number = new Date().getFullYear();
    get year() {
        return this._year;
    }
    set year(value: any) {
        this._year = value;

        this.selectedDate = new Date(this.year, this.month - 1, 1);
    }

    selectedDate: Date = moment().add(1, 'month').toDate();

    years = (
       function() {
           const date = new Date();
           let year = date.getFullYear();

           let years: number[] = [];
           for (let i = 0; i < 10; i++) {
               years.push(year--);
           }
           return years;
       }
    )();

    constructor() {

    }

    ngOnInit() {

    }
}
