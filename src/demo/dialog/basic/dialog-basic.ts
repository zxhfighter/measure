import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../../../component/dialog';

@Component({
    selector: 'demo-dialog-basic',
    templateUrl: './dialog-basic.html',
    styleUrls: ['./dialog-basic.less']
})
export class DialogBasicDemo {
    @ViewChild('modalDialog') modalDialog: DialogComponent;
    @ViewChild('unmodalDialog') unmodalDialog: DialogComponent;

    openModalDialog() {
        this.modalDialog.show();
    }

    openUnmodalDialog() {
        this.unmodalDialog.show();
    }
}
