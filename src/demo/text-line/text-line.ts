import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'demo-text-line',
    templateUrl: './text-line.html',
    styleUrls: ['./text-line.less'],
    preserveWhitespaces: false
})
export class TextLineDemo {
    // basic sources
    tsCodeBasic: string = require('!!raw-loader!./basic/text-line-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/text-line-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/text-line-basic.less');

    // form sources
    tsCodeForm: string = require('!!raw-loader!./form/text-line-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/text-line-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/text-line-form.less');
}
