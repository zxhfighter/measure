import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from '../../component/calendar';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { CalendarDemo } from './calendar';
import { MonthViewDemo } from './monthview/monthview';
import { CalendarInnerDemo } from './calendar/calendar';
import { DatePickerDemo } from './datepicker/datepicker';
import { DateRangeDemo } from './daterangepicker/date-range';
import { CalendarFormDemo } from './form/calendar-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        CalendarDemo,
        MonthViewDemo,
        CalendarInnerDemo,
        DatePickerDemo,
        DateRangeDemo,
        CalendarFormDemo
    ],
    providers: [],
    exports: []
})
export class CalendarDemoModule { }
