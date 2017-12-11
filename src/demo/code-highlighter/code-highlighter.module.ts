import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { CodeHighlighterDemo } from './code-highlighter';
import { CodeHighlighterBasicDemo } from './basic/code-highlighter-basic';

@NgModule({
    imports: [
        CommonModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        CodeHighlighterDemo,
        CodeHighlighterBasicDemo
    ],
    providers: [],
    exports: []
})
export class CodeHighlighterDemoModule { }
