import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-code-box',
    templateUrl: './code-box.html',
    styleUrls: ['./code-box.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoCodeBox implements OnInit {

    tsCode: string = require('!!raw-loader!./code-box.ts');
    htmlCode: string = require('!!raw-loader!./code-box.html');
    lessCode: string = require('!!raw-loader!./code-box.less');

    constructor() {

    }

    ngOnInit() {

    }
}
