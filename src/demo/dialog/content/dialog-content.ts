import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../../../component/dialog/dialog';
// import { TooltipDirective } from '../../../component/tooltip/tooltip';

@Component({
    selector: 'demo-dialog-content',
    templateUrl: './dialog-content.html',
    styleUrls: ['./dialog-content.less']
})
export class DialogContentDemo {
    @ViewChild('customFooterDialog') customFooterDialog: DialogComponent;

    openCustomFooterDialog() {
        this.customFooterDialog.open();
    }

    close() {
        this.customFooterDialog.close();
    }

    clickYes() {
        this.customFooterDialog.close();
    }

    clickNo() {
        this.customFooterDialog.close();
    }
}
