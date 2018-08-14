import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTransferComponent } from './tree-transfer';
import { ButtonModule } from '../button/button.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { TreeModule } from '../tree/tree.module';
import { TransferModule } from '../transfer/transfer.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        SearchBoxModule,
        TreeModule,
        TransferModule
    ],
    declarations: [
        TreeTransferComponent
    ],
    providers: [],
    exports: [
        TreeTransferComponent
    ]
})

export class TreeTransferModule { }
