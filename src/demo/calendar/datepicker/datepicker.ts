import { Component } from '@angular/core';
import { addDays, addMonths } from 'date-fns';

@Component({
    selector: 'demo-datepicker',
    templateUrl: './datepicker.html',
    styleUrls: ['./datepicker.less']
})
export class DatePickerDemo {
    startDate = new Date();
    endDate = addDays(new Date(), 7);
    selectedDate: Date = addMonths(new Date(), 1);
}
