import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from '../../component/accordion';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { AccordionDemo } from './accordion';
import { AccordionBasicDemo } from './basic/accordion-basic';
import { AccordionCollapsibleDemo } from './collapsible/accordion-collapsible';
import { AccordionHoverableDemo } from './hoverable/accordion-hoverable';

@NgModule({
    imports: [
        CommonModule,
        AccordionModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        AccordionDemo,
        AccordionBasicDemo,
        AccordionCollapsibleDemo,
        AccordionHoverableDemo
    ],
    providers: [],
    exports: []
})
export class AccordionDemoModule { }
