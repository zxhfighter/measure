import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule';
import { SelectModule } from '../select';
import { BoxGroupModule } from '../box-group';

@NgModule({
    imports: [CommonModule, SelectModule, BoxGroupModule],
    declarations: [ScheduleComponent],
    exports: [ScheduleComponent]
})
export class ScheduleModule { }
