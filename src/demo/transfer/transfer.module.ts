import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';
import { TransferModule } from '../../component/transfer';

import { TransferDemo } from './transfer';
import { TransferBasicDemo } from './basic/transfer-basic';

@NgModule({
    imports: [
        CommonModule,
        CodeBoxModule,
        CodeHighlighterModule,
        TransferModule
    ],
    declarations: [
        TransferDemo,
        TransferBasicDemo
    ],
    providers: [],
    exports: []
})

export class TransferDemoModule { }
