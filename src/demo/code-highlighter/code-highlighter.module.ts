import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { DemoCodeHighlighter } from './code-highlighter';
import { DemoCodeHighlighterBasic } from './basic/code-highlighter-basic';

@NgModule({
    imports: [
        CommonModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoCodeHighlighter,
        DemoCodeHighlighterBasic
    ],
    providers: [],
    exports: []
})
export class CodeHighlighterDemoModule { }
