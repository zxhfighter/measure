import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'demo-daterange',
    templateUrl: './date-range.html',
    styleUrls: ['./date-range.less']
})
export class DemoDateRange {
    startDate = new Date();
    endDate = moment().add(7, 'd').toDate();
    selectedDate: Date = moment().add(1, 'month').toDate();
}
