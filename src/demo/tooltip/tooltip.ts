import { Component } from '@angular/core';

@Component({
    selector: 'demo-tooltip',
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.less']
})
export class TooltipDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/tooltip-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/tooltip-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/tooltip-basic.less');
}
