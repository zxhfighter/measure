import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegionModule } from '../../component/region';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { RegionDemo } from './region';
import { RegionBasicDemo } from './basic/region-basic';
import { RegionFormDemo } from './form/region-form';

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
        RegionDemo,
        RegionBasicDemo,
        RegionFormDemo
    ],
    providers: [],
    exports: []
})
export class RegionDemoModule { }
