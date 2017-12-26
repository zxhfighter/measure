import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextareaModule } from '../../component/textarea';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { TextareaDemo } from './textarea';
import { TextareaThemeDemo } from './themes/textarea-theme';

@NgModule({
    imports: [
        CommonModule,
        TextareaModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        TextareaDemo,
        TextareaThemeDemo
    ],
    providers: [],
    exports: []
})

export class TextareaDemoModule { }
