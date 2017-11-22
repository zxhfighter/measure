import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-code-highlighter',
    templateUrl: './code-highlighter.html',
    styleUrls: ['./code-highlighter.less'],
    preserveWhitespaces: true,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoCodeHighlighter implements OnInit {

    jsCode: string = require('!!raw-loader!./code-highlighter.ts');
    htmlCode: string = require('!!raw-loader!./code-highlighter.html');
    lessCode: string = require('!!raw-loader!./code-highlighter.less');

    constructor() {

    }

    ngOnInit() {
    }
}
