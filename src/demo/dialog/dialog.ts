import {
    Component, OnInit, ChangeDetectionStrategy, ViewChild, Injector, ViewContainerRef,
    Renderer2, ComponentFactoryResolver, NgZone, AfterViewInit
} from '@angular/core';
import { DialogComponent } from '../../component/dialog/dialog';
import { AlertComponent } from '../../component/dialog/alert';
import { DialogService } from '../../component/dialog/dialog.service';

@Component({
    selector: 'demo-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoDialog implements OnInit, AfterViewInit {

    @ViewChild('modalDialog') modalDialog: DialogComponent;
    @ViewChild('unmodalDialog') unmodalDialog: DialogComponent;
    @ViewChild('customFooterDialog') customFooterDialog: DialogComponent;
    @ViewChild(AlertComponent) errorAlert: AlertComponent;
    @ViewChild('infoAlert') infoAlert: AlertComponent;
    @ViewChild('successAlert') successAlert: AlertComponent;

    dialogService: DialogService<AlertComponent>;

    constructor(
        private _injector: Injector,
        private _viewContainerRef: ViewContainerRef,
        private _renderer: Renderer2,
        componentFactoryResolver: ComponentFactoryResolver,
        private ngZone: NgZone
    ) {
        this.dialogService = new DialogService(
            _injector,
            _viewContainerRef,
            _renderer,
            componentFactoryResolver,
            ngZone
        );
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

    clickNO() {
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
