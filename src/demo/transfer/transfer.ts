import { Component } from '@angular/core';

@Component({
    selector: 'demo-transfer',
    templateUrl: './transfer.html',
    styleUrls: ['./transfer.less'],
    preserveWhitespaces: false
})
export class TransferDemo {
    // basic sources
    tsCodeBasic: string = require('!!raw-loader!./basic/transfer-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/transfer-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/transfer-basic.less');
}
