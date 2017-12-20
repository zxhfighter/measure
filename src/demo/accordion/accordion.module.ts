import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from '../../component/accordion';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { AccordionDemo } from './accordion';
import { AccordionBasicDemo } from './basic/accordion-basic';

@NgModule({
    imports: [
        CommonModule,
        AccordionModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        AccordionDemo,
        AccordionBasicDemo
    ],
    providers: [],
    exports: []
})
export class AccordionDemoModule { }
