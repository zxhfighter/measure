import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeHighlighterComponent} from './code-highlighter';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CodeHighlighterComponent
    ],
    exports: [
        CodeHighlighterComponent
    ]
})
export class CodeHighlighterModule {}
