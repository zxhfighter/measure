import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ButtonGroupModule} from '../../component/button-group';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoButtonGroup} from './button-group';
import {DemoButtonGroupBasic} from './basic/button-group-basic';
import {DemoButtonGroupForm} from './form/button-group-form';

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
        DemoButtonGroup,
        DemoButtonGroupBasic,
        DemoButtonGroupForm
    ],
    providers: [],
    exports: []
})
export class ButtonGroupDemoModule {}
