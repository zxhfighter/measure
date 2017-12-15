import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'demo-datepicker',
    templateUrl: './datepicker.html',
    styleUrls: ['./datepicker.less']
})
export class DatePickerDemo {
    startDate = new Date();
    endDate = moment().add(7, 'd').toDate();
    selectedDate: Date = moment().add(1, 'month').toDate();
}
