import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../../component/button';
import { InputModule } from '../../component/input';
import { TableModule } from '../../component/table';
import { BoxGroupModule } from '../../component/box-group';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { TableDemo } from './table';
import { TableBasicDemo } from './basic/table-basic';
import { TableCheckboxDemo } from './checkbox/table-checkbox';
import { TableSortDemo } from './sortable/table-sort';
import { TableResizeDemo } from './resize/table-resize';
import { TableFixHeadDemo } from './fix-head/table-fix-head';
import { TableFixColumnDemo } from './fix-column/fix-column';
import { TableColSpanDemo } from './colspan/table-colspan';
import { TableExpandDemo } from './expand/table-expand';
import { TableEditDemo } from './edit/table-edit';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TableModule,
        BoxGroupModule,
        CodeBoxModule,
        CodeHighlighterModule,
        InputModule
    ],
    declarations: [
        TableDemo,
        TableBasicDemo,
        TableCheckboxDemo,
        TableSortDemo,
        TableResizeDemo,
        TableFixHeadDemo,
        TableFixColumnDemo,
        TableColSpanDemo,
        TableExpandDemo,
        TableEditDemo
    ],
    providers: [],
    exports: []
})
export class TableDemoModule { }
