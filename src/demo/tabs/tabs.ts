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

    tsCodeCustomTitle: string = require('!!raw-loader!./custom-title/tabs-custom-title.ts');
    htmlCodeCustomTitle: string = require('!!raw-loader!./custom-title/tabs-custom-title.html');
    lessCodeCustomTitle: string = require('!!raw-loader!./custom-title/tabs-custom-title.less');

    tsCodeContent: string = require('!!raw-loader!./content/tabs-content.ts');
    htmlCodeContent: string = require('!!raw-loader!./content/tabs-content.html');
    lessCodeContent: string = require('!!raw-loader!./content/tabs-content.less');
}
