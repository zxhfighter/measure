import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonGroupModule } from '../../component/button-group';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { ButtonGroupDemo } from './button-group';
import { ButtonGroupBasicDemo } from './basic/button-group-basic';
import { ButtonGroupFormDemo } from './form/button-group-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonGroupModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        ButtonGroupDemo,
        ButtonGroupBasicDemo,
        ButtonGroupFormDemo
    ],
    providers: [],
    exports: []
})
export class ButtonGroupDemoModule { }
