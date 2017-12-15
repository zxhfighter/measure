import { Component } from '@angular/core';

@Component({
    selector: 'demo-switch',
    templateUrl: './switch.html',
    styleUrls: ['./switch.less'],
    preserveWhitespaces: false
})
export class SwitchDemo {

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./basic/switch-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/switch-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/switch-basic.less');

    // forms source
    tsCodeForm: string = require('!!raw-loader!./form/switch-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/switch-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/switch-form.less');
}
