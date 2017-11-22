import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SpinnerModule} from '../../component/spinner';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoSpinner} from './spinner';
import {DemoSpinnerBasic} from './basic/spinner-basic';
import {DemoSpinnerForm} from './form/spinner-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoSpinner,
        DemoSpinnerBasic,
        DemoSpinnerForm
    ],
    providers: [],
    exports: []
})
export class SpinnerDemoModule {}
