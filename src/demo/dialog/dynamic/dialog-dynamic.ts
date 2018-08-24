import { Component, ViewContainerRef, OnDestroy } from '@angular/core';
import { DialogService } from '../../../component/dialog';

@Component({
    selector: 'demo-dialog-dynamic',
    templateUrl: './dialog-dynamic.html',
    styleUrls: ['./dialog-dynamic.less'],
    providers: [DialogService]
})
export class DialogDynamicDemo implements OnDestroy {

    constructor(
        // 必须声明viewContainerRef，dialogService中会使用到
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

    ngOnDestroy() {
        this.dialogService.dispose();
    }

}
