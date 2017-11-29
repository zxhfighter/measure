import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TableModule} from '../../component/table';
import {CardModule} from '../../component/card';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoTable} from './table';
import {DemoTableBasic} from './basic/table-basic';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoTable,
        DemoTableBasic
    ],
    providers: [],
    exports: []
})
export class TableDemoModule {}
