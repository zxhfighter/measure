import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SwitchModule } from '../../component/switch';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { SwitchDemo } from './switch';
import { SwitchBasicDemo } from './basic/switch-basic';
import { SwitchFormDemo } from './form/switch-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SwitchModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        SwitchDemo,
        SwitchBasicDemo,
        SwitchFormDemo
    ],
    providers: [],
    exports: []
})
export class SwitchDemoModule { }
