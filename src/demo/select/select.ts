import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'demo-select',
    templateUrl: './select.html',
    styleUrls: ['./select.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class SelectDemo {
    tsCode: string = require('!!raw-loader!./href/select-href.ts');
    htmlCode: string = require('!!raw-loader!./href/select-href.html');
    lessCode: string = require('!!raw-loader!./href/select-href.less');

    constructor() {
    }
}
