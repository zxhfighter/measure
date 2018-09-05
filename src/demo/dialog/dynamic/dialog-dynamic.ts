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

    clickSuccessBox() {
        this.dialogService.success('恭喜你，你的资料已经提交成功！', '创建条目成功')
            .then(this.onConfirm);
    }

    clickErrorBox() {
        this.dialogService.error('请完善你的资料，保证内容真实。', '创建条目失败')
            .then(this.onConfirm);
    }

    clickInfoBox() {
        this.dialogService.info('请完善你的资料，保证内容真实。', '创建条目提醒')
            .then(this.onConfirm);
    }

    clickConfirmBox() {
        this.dialogService.confirm('是否需要保存已修改内容？', '关闭确认')
            .then(this.onConfirm, this.onCancel);
    }

    onConfirm() {
        console.log('确定');
    }

    onCancel() {
        console.log('取消');
    }

    ngOnDestroy() {
        // 必须销毁dialogService
        this.dialogService.dispose();
    }

}
