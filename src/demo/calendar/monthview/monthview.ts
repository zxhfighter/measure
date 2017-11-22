import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'demo-monthview',
    templateUrl: './monthview.html',
    styleUrls: ['./monthview.less']
})
export class DemoMonthView {
    startDate = new Date();
    endDate = moment().add(7, 'd').toDate();
    selectedDate: Date = moment().add(1, 'month').toDate();
}
