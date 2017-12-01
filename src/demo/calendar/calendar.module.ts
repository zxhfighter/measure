import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CalendarModule} from '../../component/calendar';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoCalendar} from './calendar';
import {DemoMonthView} from './monthview/monthview';
import {DemoCalendarInner} from './calendar/calendar';
import {DemoDatePicker} from './datepicker/datepicker';
import {DemoDateRange} from './daterangepicker/date-range';
import {DemoCalendarForm} from './form/calendar-form';

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
        DemoCalendar,
        DemoMonthView,
        DemoCalendarInner,
        DemoDatePicker,
        DemoDateRange,
        DemoCalendarForm
    ],
    providers: [],
    exports: []
})
export class CalendarDemoModule {}
