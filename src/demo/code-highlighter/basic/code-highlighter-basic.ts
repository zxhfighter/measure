import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'demo-code-highlighter-basic',
    templateUrl: './code-highlighter-basic.html',
    styleUrls: ['./code-highlighter-basic.less'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class CodeHighlighterBasicDemo implements OnInit {
    jsCode: string = require('!!raw-loader!./code-highlighter-basic.ts');
    htmlCode: string = require('!!raw-loader!./code-highlighter-basic.html');
    lessCode: string = require('!!raw-loader!./code-highlighter-basic.less');

    ngOnInit() {
        setTimeout(() => {
            this.jsCode = 'var a = 2;';
            console.log('变变变');
        }, 2000);
    }
}
