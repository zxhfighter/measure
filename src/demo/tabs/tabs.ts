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

    tsCodeTipable: string = require('!!raw-loader!./tipable/tabs-tipable.ts');
    htmlCodeTipable: string = require('!!raw-loader!./tipable/tabs-tipable.html');
    lessCodeTipable: string = require('!!raw-loader!./tipable/tabs-tipable.less');

    tsCodeContent: string = require('!!raw-loader!./content/tabs-content.ts');
    htmlCodeContent: string = require('!!raw-loader!./content/tabs-content.html');
    lessCodeContent: string = require('!!raw-loader!./content/tabs-content.less');
}
