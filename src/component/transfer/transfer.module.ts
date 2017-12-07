import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer';
import { SearchBoxModule } from '../search-box/search-box.module';
import { TreeModule } from '../tree/tree.module';

@NgModule({
    imports: [CommonModule, SearchBoxModule, TreeModule],
    declarations: [TransferComponent],
    exports: [TransferComponent]
})
export class TransferModule { }
