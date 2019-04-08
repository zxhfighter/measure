import { Component } from '@angular/core';
import { addDays, addMonths } from 'date-fns';

@Component({
    selector: 'demo-daterange',
    templateUrl: './date-range.html',
    styleUrls: ['./date-range.less']
})
export class DateRangeDemo {
    startDate = new Date();
    endDate = addDays(new Date(), 7);
    selectedDate: Date = addMonths(new Date(), 1);
}
