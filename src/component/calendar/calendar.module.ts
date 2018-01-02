import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '../button/button.module';
import { OverlayModule } from '../overlay/overlay.module';

import { CalendarComponent } from './calendar';
import { MonthViewComponent } from './month-view';
import { DatePickerComponent } from './datepicker';
import { RangeDatePickerComponent } from './range-datepicker';

const components = [
    CalendarComponent,
    MonthViewComponent,
    DatePickerComponent,
    RangeDatePickerComponent
];

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, OverlayModule],
    declarations: [...components],
    exports: [...components]
})
export class CalendarModule { }
