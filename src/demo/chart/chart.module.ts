import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartModule} from '../../component/chart';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoChart} from './chart';
import {DemoChartBasic} from './basic/chart-basic';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoChart,
        DemoChartBasic
    ],
    providers: [],
    exports: []
})
export class ChartDemoModule {}
