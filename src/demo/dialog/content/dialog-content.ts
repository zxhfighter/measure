import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../../../component/dialog';

@Component({
    selector: 'demo-dialog-content',
    templateUrl: './dialog-content.html',
    styleUrls: ['./dialog-content.less']
})
export class DialogContentDemo {
    @ViewChild('customFooterDialog') customFooterDialog: DialogComponent;

    openCustomFooterDialog() {
        this.customFooterDialog.show();
    }

    close() {
        this.customFooterDialog.hide();
    }

    clickYes() {
        this.customFooterDialog.hide();
    }

    clickNo() {
        this.customFooterDialog.hide();
    }
}
