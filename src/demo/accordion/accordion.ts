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

    tsCodeCollapsible: string = require('!!raw-loader!./collapsible/accordion-collapsible.ts');
    htmlCodeCollapsible: string = require('!!raw-loader!./collapsible/accordion-collapsible.html');
    lessCodeCollapsible: string = require('!!raw-loader!./collapsible/accordion-collapsible.less');

    tsCodeHoverable: string = require('!!raw-loader!./hoverable/accordion-hoverable.ts');
    htmlCodeHoverable: string = require('!!raw-loader!./hoverable/accordion-hoverable.html');
    lessCodeHoverable: string = require('!!raw-loader!./hoverable/accordion-hoverable.less');
}
