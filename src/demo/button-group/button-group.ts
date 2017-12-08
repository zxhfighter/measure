import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'demo-button-group',
    templateUrl: './button-group.html',
    styleUrls: ['./button-group.less'],
    preserveWhitespaces: false
})
export class ButtonGroupDemo {

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./basic/button-group-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/button-group-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/button-group-basic.less');

    // form source
    tsCodeForm: string = require('!!raw-loader!./form/button-group-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/button-group-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/button-group-form.less');
}
