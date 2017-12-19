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
}
