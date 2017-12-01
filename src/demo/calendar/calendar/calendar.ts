import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'demo-calendar-inner',
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.less']
})
export class DemoCalendarInner {
    startDate = new Date();
    endDate = moment().add(7, 'd').toDate();
    selectedDate: Date = moment().add(1, 'month').toDate();
}
