/* tslint:disable:no-access-missing-member */
import {
    Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import { OnChange } from '../core/decorators';
import { slideAnimation } from '../core/animation/slide-animations';
import { OverlayComponent } from '../overlay';


@Component({
    selector: 'nb-dialog',
    exportAs: 'nbDialog',
    templateUrl: './dialog.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    animations: [ slideAnimation ],
    host: {
        'class': 'nb-widget'
    }
})

export class DialogComponent extends OverlayComponent implements OnInit {
    /**
     * 是否为模态对话框
     * @default false
     */
    @OnChange(true)
    @Input() modalable: boolean = false;

    /**
     * 是否有关闭功能
     * @default true
     */
    @OnChange(true)
    @Input() closable: boolean = true;

    /**
     * 点击对话框的确认按钮时事件 emit
     */
    @Output() confirmEvent: EventEmitter<Object> = new EventEmitter();

    /**
     * 覆盖overlay的OnInit方法，不响应document click事件
     */
    ngOnInit() {

    }

    /**
     * Dialog确定按钮的点击响应
     */
    confirm() {
        this.confirmEvent.emit();
        this.hide();
    }
}
