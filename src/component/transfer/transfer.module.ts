import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer';
import { TransferCandidateComponent } from './transfer-candidate';
import { TransferSelectedComponent } from './transfer-selected';
import { ButtonModule } from '../button/button.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { TreeModule } from '../tree/tree.module';
import { TransferService } from './transfer.service';
 
@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        SearchBoxModule,
        TreeModule
    ],
    declarations: [
        TransferComponent,
        TransferCandidateComponent,
        TransferSelectedComponent
    ],
    providers: [
        TransferService
    ],
    exports: [
        TransferComponent,
        TransferCandidateComponent,
        TransferSelectedComponent
    ]
})

export class TransferModule { }
