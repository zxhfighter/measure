import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule';
import { SelectModule } from '../select';

@NgModule({
    imports: [CommonModule, SelectModule],
    declarations: [ScheduleComponent],
    exports: [ScheduleComponent]
})
export class ScheduleModule { }
