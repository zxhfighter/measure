import { Component } from '@angular/core';
import { addDays, addMonths } from 'date-fns';

@Component({
    selector: 'demo-calendar-form',
    templateUrl: './calendar-form.html',
    styleUrls: ['./calendar-form.less']
})
export class CalendarFormDemo {
    startDate = new Date();
    endDate = addDays(new Date(), 7);
    selectedDate: Date = addMonths(new Date(), 1);
    rangeValue = {
        startDate: new Date(),
        endDate: new Date()
    };
}
