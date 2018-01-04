import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from '../../component/select';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { SelectDemo } from './select';
import { SelectBaseDemo } from './base/select-base';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        SelectDemo,
        SelectBaseDemo
    ],
    providers: [],
    exports: []
})
export class SelectDemoModule { }
