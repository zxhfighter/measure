import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormModule } from '../../component/form';
import { ButtonModule } from '../../component/button';
import { ButtonGroupModule } from '../../component/button-group';
import { InputModule } from '../../component/input';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';
import { BoxGroupModule } from '../../component/box-group';
import { SwitchModule } from '../../component/switch';
import { SelectModule } from '../../component/select';
import { ChipsModule } from '../../component/chips';
import { SpinnerModule } from '../../component/spinner';
import { TextareaModule } from '../../component/textarea';
import { GridModule } from '../../component/grid';

import { FormDemo } from './form';
import { FormInlineDemo } from './inline/form-inline';
import { FormLoginDemo } from './login/form-login';
import { FormHorizontalDemo } from './horizontal/form-horizontal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormModule,
        ButtonModule,
        ButtonGroupModule,
        InputModule,
        CodeBoxModule,
        CodeHighlighterModule,
        BoxGroupModule,
        SwitchModule,
        SelectModule,
        ChipsModule,
        SpinnerModule,
        TextareaModule,
        GridModule
    ],
    declarations: [
        FormDemo,
        FormInlineDemo,
        FormLoginDemo,
        FormHorizontalDemo,
    ],
    providers: [],
    exports: []
})
export class FormDemoModule { }
