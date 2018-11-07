import { Component, AfterViewInit } from '@angular/core';

import { ButtonConfig } from '../../component/button';
export function getButtonConfig(): ButtonConfig {
    return Object.assign(new ButtonConfig, { theme: 'default' });
}

@Component({
    selector: 'demo-button',
    templateUrl: './button.html',
    styleUrls: ['./button.less'],
    providers: [{ provide: ButtonConfig, useFactory: getButtonConfig }]
})
export class ButtonDemo implements AfterViewInit {

    // theme sources
    tsCode: string = require('!!raw-loader!./themes/button-theme.ts');
    htmlCode: string = require('!!raw-loader!./themes/button-theme.html');
    lessCode: string = require('!!raw-loader!./themes/button-theme.less');

    // size sources
    tsCodeSize: string = require('!!raw-loader!./size/button-size.ts');
    htmlCodeSize: string = require('!!raw-loader!./size/button-size.html');
    lessCodeSize: string = require('!!raw-loader!./size/button-size.less');

    // link sources
    tsCodeLink: string = require('!!raw-loader!./link/button-link.ts');
    htmlCodeLink: string = require('!!raw-loader!./link/button-link.html');
    lessCodeLink: string = require('!!raw-loader!./link/button-link.less');

    // icon sources
    tsCodeIcon: string = require('!!raw-loader!./icon/button-icon.ts');
    htmlCodeIcon: string = require('!!raw-loader!./icon/button-icon.html');
    lessCodeIcon: string = require('!!raw-loader!./icon/button-icon.less');

    ngAfterViewInit() {
        console.log(this.tsCode);
    }
}
