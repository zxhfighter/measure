import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';
import { TreeTransferModule } from '../../component/tree-transfer';
import { TableTransferModule } from '../../component/table-transfer';
import { TooltipModule } from '../../component/tooltip';

import { TransferDemo } from './transfer';
import { TransferBasicDemo } from './basic/transfer-basic';

@NgModule({
    imports: [
        CommonModule,
        CodeBoxModule,
        CodeHighlighterModule,
        TreeTransferModule,
        TableTransferModule,
        TooltipModule
    ],
    declarations: [
        TransferDemo,
        TransferBasicDemo
    ],
    providers: [],
    exports: []
})

export class TransferDemoModule { }
