import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';
import { TextLineModule } from '../../component/text-line';

import { TextLineDemo } from './text-line';
import { TextLineBasicDemo } from './basic/text-line-basic';
import { TextLineFormDemo } from './form/text-line-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CodeBoxModule,
        CodeHighlighterModule,
        TextLineModule
    ],
    declarations: [
        TextLineDemo,
        TextLineBasicDemo,
        TextLineFormDemo
    ],
    providers: [],
    exports: []
})

export class TextLineDemoModule { }
