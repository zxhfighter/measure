import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StepModule} from '../../component/step';
import {ButtonModule} from '../../component/button';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoStep} from './step';
import {DemoStepBasic} from './basic/step-basic';
import {DemoStepMulti} from './multiline/step-multi';
import {DemoStepVertical} from './vertical/step-vertical';
import {DemoStepSmall} from './small/step-small';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        StepModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoStep,
        DemoStepBasic,
        DemoStepMulti,
        DemoStepVertical,
        DemoStepSmall
    ],
    providers: [],
    exports: []
})
export class StepDemoModule {}
