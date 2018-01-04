import { Component } from '@angular/core';

@Component({
    selector: 'demo-schedule-selected',
    templateUrl: './schedule-selected.html',
    styleUrls: ['./schedule-selected.less']
})
export class ScheduleSelectedDemo {
    selected = {
        0: [[0, 23]],
        1: [[9, 12], [13, 18]],
        3: [[13, 16]]
    };
}
