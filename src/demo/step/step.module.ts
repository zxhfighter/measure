import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepModule } from '../../component/step';
import { ButtonModule } from '../../component/button';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { StepDemo } from './step';
import { StepBasicDemo } from './basic/step-basic';
import { StepMultiDemo } from './multiline/step-multi';
import { StepVerticalDemo } from './vertical/step-vertical';
import { StepSmallDemo } from './small/step-small';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        StepModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        StepDemo,
        StepBasicDemo,
        StepMultiDemo,
        StepVerticalDemo,
        StepSmallDemo
    ],
    providers: [],
    exports: []
})
export class StepDemoModule { }
