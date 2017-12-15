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
export class CodeHighlighterDemo implements OnInit {

    tsCode: string = require('!!raw-loader!./basic/code-highlighter-basic.ts');
    htmlCode: string = require('!!raw-loader!./basic/code-highlighter-basic.html');
    lessCode: string = require('!!raw-loader!./basic/code-highlighter-basic.less');

    constructor() {

    }

    ngOnInit() {
    }
}
