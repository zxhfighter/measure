import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TableModule} from '../../component/table';
import {BoxGroupModule} from '../../component/box-group';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoTable} from './table';
import {DemoTableBasic} from './basic/table-basic';
import {DemoTableCheckbox} from './checkbox/table-checkbox';
import {DemoTableSort} from './sortable/table-sort';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        BoxGroupModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoTable,
        DemoTableBasic,
        DemoTableCheckbox,
        DemoTableSort
    ],
    providers: [],
    exports: []
})
export class TableDemoModule {}
