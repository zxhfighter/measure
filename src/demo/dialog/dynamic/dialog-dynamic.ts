import { Component, ViewChild, Renderer2, ViewContainerRef } from '@angular/core';
import { AlertComponent } from '../../../component/dialog';
import { DialogService } from '../../../component/dialog';
import { DynamicComponentService } from '../../../component/overlay';

@Component({
    selector: 'demo-dialog-dynamic',
    templateUrl: './dialog-dynamic.html',
    styleUrls: ['./dialog-dynamic.less'],
    providers: [DialogService, DynamicComponentService]
})
export class DialogDynamicDemo {

    constructor(
        private _renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
        private dialogService: DialogService) {
    }

    openSpecialDialog(type, content, title) {
        this.dialogService[type](content, title);
    }

    clickConfirmBox() {
        this.dialogService['confirm']('是否需要保存已修改内容？', '关闭确认')
            .then(this.onConfirm, this.onCancel);
    }

    onConfirm() {
        console.log('确定');
    }

    onCancel() {
        console.log('取消');
    }
}
