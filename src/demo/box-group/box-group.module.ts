import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BoxGroupModule} from '../../component/box-group';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoBoxGroup} from './box-group';
import {DemoCheckbox} from './checkbox/checkbox';
import {DemoRadio} from './radio/radio';
import {DemoCheckboxGroup} from './checkbox-group/checkbox-group';
import {DemoRadioGroup} from './radio-group/radio-group';
import {DemoBoxGroupForm} from './form/box-group-form';

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
        DemoBoxGroup,
        DemoCheckbox,
        DemoRadio,
        DemoCheckboxGroup,
        DemoRadioGroup,
        DemoBoxGroupForm
    ],
    providers: [],
    exports: []
})
export class BoxGroupDemoModule {}
