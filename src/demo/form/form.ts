import { Component } from '@angular/core';

@Component({
    selector: 'demo-form',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class FormDemo {

    tsCodeInline: string = require('!!raw-loader!./inline/form-inline.ts');
    htmlCodeInline: string = require('!!raw-loader!./inline/form-inline.html');
    lessCodeInline: string = require('!!raw-loader!./inline/form-inline.less');

    tsCodeLogin: string = require('!!raw-loader!./login/form-login.ts');
    htmlCodeLogin: string = require('!!raw-loader!./login/form-login.html');
    lessCodeLogin: string = require('!!raw-loader!./login/form-login.less');

    tsCodeHorizontal: string = require('!!raw-loader!./horizontal/form-horizontal.ts');
    htmlCodeHorizontal: string = require('!!raw-loader!./horizontal/form-horizontal.html');
    lessCodeHorizontal: string = require('!!raw-loader!./horizontal/form-horizontal.less');
}
