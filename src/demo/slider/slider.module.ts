import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SliderModule } from '../../component/slider';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { SliderComponentDemo } from './slider';
import { SliderBasicDemo } from './basic/slider-basic';
import { SliderFormDemo } from './form/slider-form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SliderModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        SliderComponentDemo,
        SliderBasicDemo,
        SliderFormDemo
    ],
    providers: [],
    exports: []
})
export class SliderDemoModule { }
