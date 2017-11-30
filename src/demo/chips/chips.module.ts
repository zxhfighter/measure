import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ChipsModule} from '../../component/chips';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoChips} from './chips';
import {DemoChipsBasic} from './basic/chips-basic';
import {DemoChipsForm} from './form/chips-form';

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
        DemoChips,
        DemoChipsBasic,
        DemoChipsForm
    ],
    providers: [],
    exports: []
})
export class ChipsDemoModule {}
