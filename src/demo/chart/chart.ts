import {
    Component, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-chart',
    templateUrl: './chart.html',
    styleUrls: ['./chart.less'],
    preserveWhitespaces: false
})
export class ChartDemo {

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./basic/chart-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/chart-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/chart-basic.less');
}
