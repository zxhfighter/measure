import { Component } from '@angular/core';

@Component({
    selector: 'demo-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.less']
})
export class DialogDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/dialog-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/dialog-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/dialog-basic.less');

    tsCodeContent: string = require('!!raw-loader!./content/dialog-content.ts');
    htmlCodeContent: string = require('!!raw-loader!./content/dialog-content.html');
    lessCodeContent: string = require('!!raw-loader!./content/dialog-content.less');

    tsCodeDynamic: string = require('!!raw-loader!./dynamic/dialog-dynamic.ts');
    htmlCodeDynamic: string = require('!!raw-loader!./dynamic/dialog-dynamic.html');
    lessCodeDynamic: string = require('!!raw-loader!./dynamic/dialog-dynamic.less');
}
