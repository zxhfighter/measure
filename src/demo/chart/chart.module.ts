import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from '../../component/chart';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { ChartDemo } from './chart';
import { ChartBasicDemo } from './basic/chart-basic';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        ChartDemo,
        ChartBasicDemo
    ],
    providers: [],
    exports: []
})
export class ChartDemoModule { }
