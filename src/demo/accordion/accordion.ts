import { Component } from '@angular/core';

@Component({
    selector: 'demo-accordion',
    templateUrl: './accordion.html',
    styleUrls: ['./accordion.less']
})
export class AccordionDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/accordion-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/accordion-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/accordion-basic.less');
}
