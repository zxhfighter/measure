import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BoxGroupModule } from '../../component/box-group';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { BoxGroupDemo } from './box-group';
import { CheckboxDemo } from './checkbox/checkbox';
import { RadioDemo } from './radio/radio';
import { CheckboxGroupDemo } from './checkbox-group/checkbox-group';
import { RadioGroupDemo } from './radio-group/radio-group';
import { BoxGroupFormDemo } from './form/box-group-form';
import { BoxGroupDynamicDemo } from './dynamic/box-group-dynamic';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BoxGroupModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        BoxGroupDemo,
        CheckboxDemo,
        RadioDemo,
        CheckboxGroupDemo,
        RadioGroupDemo,
        BoxGroupFormDemo,
        BoxGroupDynamicDemo
    ],
    providers: [],
    exports: []
})
export class BoxGroupDemoModule { }
