import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChipsModule } from '../../component/chips';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { ChipsDemo } from './chips';
import { ChipsBasicDemo } from './basic/chips-basic';
import { ChipsFormDemo } from './form/chips-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChipsModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        ChipsDemo,
        ChipsBasicDemo,
        ChipsFormDemo
    ],
    providers: [],
    exports: []
})
export class ChipsDemoModule { }
