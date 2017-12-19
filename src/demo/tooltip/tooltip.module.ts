import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from '../../component/tooltip';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { TooltipDemo } from './tooltip';
import { TooltipBasicDemo } from './basic/tooltip-basic';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        TooltipDemo,
        TooltipBasicDemo
    ],
    providers: [],
    exports: []
})
export class TooltipDemoModule { }
