import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewEncapsulation
} from '@angular/core';

import { InputConfig } from '../../component/input';

export function getInputConfig(): InputConfig {
    return Object.assign(new InputConfig, { theme: 'default' });
}

@Component({
    selector: 'demo-input',
    templateUrl: './input.html',
    styleUrls: ['./input.less'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [{ provide: InputConfig, useFactory: getInputConfig }]
})

export class InputDemo {
    // theme sources
    tsCode: string = require('!!raw-loader!./themes/input-theme.ts');
    htmlCode: string = require('!!raw-loader!./themes/input-theme.html');
    lessCode: string = require('!!raw-loader!./themes/input-theme.less');

    // size sources
    tsCodeSize: string = require('!!raw-loader!./size/input-size.ts');
    htmlCodeSize: string = require('!!raw-loader!./size/input-size.html');
    lessCodeSize: string = require('!!raw-loader!./size/input-size.less');
}
