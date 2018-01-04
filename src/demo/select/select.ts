import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'demo-select',
    templateUrl: './select.html',
    styleUrls: ['./select.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class SelectDemo {
    tsCode: string = require('!!raw-loader!./base/select-base.ts');
    htmlCode: string = require('!!raw-loader!./base/select-base.html');
    lessCode: string = require('!!raw-loader!./base/select-base.less');

    constructor() {
    }
}
