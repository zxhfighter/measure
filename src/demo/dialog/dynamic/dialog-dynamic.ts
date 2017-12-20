import { Component, ViewChild, Renderer2, ViewContainerRef } from '@angular/core';
import { AlertComponent } from '../../../component/dialog/alert';
import { DialogService } from '../../../component/dialog/dialog.service';
import { DynamicComponentService } from '../../../component/overlay/dynamic-component.service';

@Component({
    selector: 'demo-dialog-dynamic',
    templateUrl: './dialog-dynamic.html',
    styleUrls: ['./dialog-dynamic.less'],
    providers: [DialogService, DynamicComponentService]
})
export class DialogDynamicDemo {

    @ViewChild(AlertComponent) errorAlert: AlertComponent;
    @ViewChild('infoAlert') infoAlert: AlertComponent;
    @ViewChild('successAlert') successAlert: AlertComponent;

    constructor(
        private _renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
        private dialogService: DialogService<AlertComponent>) {
    }

    openSpecialDialog(type, content, title) {
        this.dialogService[type](content, title);
    }

    openAlertError() {
        this.errorAlert.open();
    }

    openAlertInfo() {
        this.infoAlert.open();
    }

    openAlertSuccess() {
        this.successAlert.open();
    }
}
