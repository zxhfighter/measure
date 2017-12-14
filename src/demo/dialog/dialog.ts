import {
    Component, OnInit, ChangeDetectionStrategy, ViewChild, Injector,
    Renderer2, ComponentFactoryResolver, NgZone, AfterViewInit, ViewContainerRef
} from '@angular/core';
import { DialogComponent } from '../../component/dialog/dialog';
import { AlertComponent } from '../../component/dialog/alert';
import { DialogService } from '../../component/dialog/dialog.service';
import { DynamicComponentService } from '../../component/overlay/dynamic-component.service';

@Component({
    selector: 'demo-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [DialogService, DynamicComponentService]
})
export class DemoDialog implements OnInit, AfterViewInit {

    @ViewChild('modalDialog') modalDialog: DialogComponent;
    @ViewChild('unmodalDialog') unmodalDialog: DialogComponent;
    @ViewChild('customFooterDialog') customFooterDialog: DialogComponent;
    @ViewChild(AlertComponent) errorAlert: AlertComponent;
    @ViewChild('infoAlert') infoAlert: AlertComponent;
    @ViewChild('successAlert') successAlert: AlertComponent;

    constructor(
        private _renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
        private dialogService: DialogService<AlertComponent>) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    openModalDialog() {
        this.modalDialog.open();
    }

    openUnmodalDialog() {
        this.unmodalDialog.open();
    }

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
