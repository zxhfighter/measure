import {
    Component, OnInit, ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

@Component({
    selector: 'demo-progress-bar',
    templateUrl: './progress-bar.html',
    styleUrls: ['./progress-bar.less'],
    preserveWhitespaces: false
})
export class ProgressBarDemo {

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./basic/progress-bar-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/progress-bar-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/progress-bar-basic.less');

    // basic source
    tsCodeCircular: string = require('!!raw-loader!./circular/progress-bar-circular.ts');
    htmlCodeCircular: string = require('!!raw-loader!./circular/progress-bar-circular.html');
    lessCodeCircular: string = require('!!raw-loader!./circular/progress-bar-circular.less');
}
