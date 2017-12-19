import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer';
import { ButtonModule } from '../button/button.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { TreeModule } from '../tree/tree.module';

@NgModule({
    imports: [CommonModule, ButtonModule, SearchBoxModule, TreeModule],
    declarations: [TransferComponent],
    exports: [TransferComponent]
})
export class TransferModule { }
