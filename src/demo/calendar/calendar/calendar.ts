import { Component } from '@angular/core';
import { addDays, addMonths } from 'date-fns';

@Component({
    selector: 'demo-calendar-inner',
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.less']
})
export class CalendarInnerDemo {
    startDate = new Date();
    endDate = addDays(new Date(), 7);
    selectedDate: Date = addMonths(new Date(), 1);
}
