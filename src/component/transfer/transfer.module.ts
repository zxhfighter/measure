import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransferComponent} from './transfer';

@NgModule({
    imports: [CommonModule],
    declarations: [TransferComponent],
    exports: [TransferComponent]
})
export class TransferModule {}
