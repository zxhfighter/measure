import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableTransferComponent } from './table-transfer';
import { ButtonModule } from '../button/button.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { TreeModule } from '../tree/tree.module';
import { TableModule } from '../table/table.module';
import { TransferModule } from '../transfer/transfer.module';
import { TooltipModule } from '../tooltip';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        SearchBoxModule,
        TreeModule,
        TableModule,
        TransferModule,
        TooltipModule
    ],
    declarations: [
        TableTransferComponent
    ],
    providers: [],
    exports: [
        TableTransferComponent
    ]
})

export class TableTransferModule { }
