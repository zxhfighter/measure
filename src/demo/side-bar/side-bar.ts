import { Component } from '@angular/core';

@Component({
    selector: 'demo-side-bar',
    templateUrl: './side-bar.html',
    styleUrls: ['./side-bar.less'],
    preserveWhitespaces: false
})

export class SideBarDemo {
    // basic sources
    tsCodeBasic: string = require('!!raw-loader!./basic/side-bar-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/side-bar-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/side-bar-basic.less');
}
