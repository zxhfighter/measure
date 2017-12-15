import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-spinner',
    templateUrl: './spinner.html',
    styleUrls: ['./spinner.less'],
    preserveWhitespaces: false
})
export class SpinnerDemo {

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./basic/spinner-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/spinner-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/spinner-basic.less');

    // form source
    tsCodeForm: string = require('!!raw-loader!./form/spinner-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/spinner-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/spinner-form.less');
}
