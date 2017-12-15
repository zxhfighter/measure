import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-code-highlighter-basic',
    templateUrl: './code-highlighter-basic.html',
    styleUrls: ['./code-highlighter-basic.less'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class CodeHighlighterBasicDemo {
    jsCode: string = require('!!raw-loader!./code-highlighter-basic.ts');
    htmlCode: string = require('!!raw-loader!./code-highlighter-basic.html');
    lessCode: string = require('!!raw-loader!./code-highlighter-basic.less');
}
