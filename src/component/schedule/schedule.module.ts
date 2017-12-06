import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleComponent} from './schedule';

@NgModule({
    imports: [CommonModule],
    declarations: [ScheduleComponent],
    exports: [ScheduleComponent]
})
export class ScheduleModule {}
