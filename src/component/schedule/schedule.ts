import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-schedule',
    templateUrl: './schedule.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-schedule'
    },
    exportAs: 'nbSchedule'
})
export class ScheduleComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
