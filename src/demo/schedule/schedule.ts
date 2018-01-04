import {
    Component, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-schedule',
    templateUrl: './schedule.html',
    styleUrls: ['./schedule.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class ScheduleDemo {

    htmlCodeSize: string = require('!!raw-loader!./selected/schedule-selected.html');
    tsCodeSize: string = require('!!raw-loader!./selected/schedule-selected.ts');
    lessCodeSize: string = require('!!raw-loader!./selected/schedule-selected.less');
}
