import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RegionModule} from '../../component/region';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoRegion} from './region';
import {DemoRegionBasic} from './basic/region-basic';
import {DemoRegionForm} from './form/region-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RegionModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoRegion,
        DemoRegionBasic,
        DemoRegionForm
    ],
    providers: [],
    exports: []
})
export class RegionDemoModule {}
