import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-schedule',
    templateUrl: './schedule.html',
    styleUrls: ['./schedule.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoSchedule implements OnInit {
    selected = {
        0: [ [0, 23] ],           
        1: [ [9, 12], [13, 18] ],
        3: [ [13, 16] ]           
    };
    constructor() {
    }

    ngOnInit() {

    }
}
