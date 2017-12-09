import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpinnerModule } from '../../component/spinner';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { SpinnerDemo } from './spinner';
import { SpinnerBasicDemo } from './basic/spinner-basic';
import { SpinnerFormDemo } from './form/spinner-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        SpinnerDemo,
        SpinnerBasicDemo,
        SpinnerFormDemo
    ],
    providers: [],
    exports: []
})
export class SpinnerDemoModule { }
