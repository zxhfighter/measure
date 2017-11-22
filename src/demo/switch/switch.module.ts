import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SwitchModule} from '../../component/switch';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoSwitch} from './switch';
import {DemoSwitchBasic} from './basic/switch-basic';
import {DemoSwitchForm} from './form/switch-form';

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
        DemoSwitch,
        DemoSwitchBasic,
        DemoSwitchForm
    ],
    providers: [],
    exports: []
})
export class SwitchDemoModule {}
