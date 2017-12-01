import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'demo-calendar-form',
    templateUrl: './calendar-form.html',
    styleUrls: ['./calendar-form.less']
})
export class DemoCalendarForm {
    startDate = new Date();
    endDate = moment().add(7, 'd').toDate();
    selectedDate: Date = moment().add(1, 'month').toDate();
}
