import { Component } from '@angular/core';

@Component({
    selector: 'demo-tabs',
    templateUrl: './tabs.html',
    styleUrls: ['./tabs.less']
})
export class TabsDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/tabs-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/tabs-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/tabs-basic.less');
}
