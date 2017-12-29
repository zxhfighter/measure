import {
    Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ContentChild,
    ViewChild
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { DialogHeaderComponent } from './dialog-header';
import { DialogBodyComponent } from './dialog-body';
import { DialogFooterComponent } from './dialog-footer';
import { slideAnimation } from '../core/animation/slide-animations';

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

export class DialogComponent implements OnInit {

    /**
     * 使用overlay子组件实现
     */
    @ViewChild('overlay') overlay;

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

    @OnChange(true)
    @Input() needHideAfterDocumentClick: boolean;

    private mask: HTMLElement | null;

    /**
     * 对话框打开时事件 emit
     */
    @Output() openHandler: EventEmitter<Object> = new EventEmitter();

    /**
     * 对话框关闭时事件 emit
     */
    @Output() closeHandler: EventEmitter<Object> = new EventEmitter();

    /**
     * 点击对话框的确认按钮时事件 emit
     */
    @Output() confirmEvent: EventEmitter<Object> = new EventEmitter();

    /**
     * 为增加动画从overlay同步来一个可见属性
     * @docs-private
     */
    visibility: boolean;

    constructor(
        private el: ElementRef,
        private cdRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.overlay.onHide.subscribe(() => this._removeMask());
    }

    /**
     * 显示Tooltip
     */
    open() {
        this.overlay.show();
        this.visibility = true;
        this.openHandler.emit();

        if (this.modalable) {
            this._enableModality();
        }
    }

    /**
     * 关闭Tooltip
     */
    close() {
        this.overlay.hide();
        this.visibility = false;
        this.closeHandler.emit();

        this._removeMask();
    }

    /**
     * 移除遮罩
     */
    _removeMask() {
        if (this.mask) {
            this.mask.remove();
            this.mask = null;
        }
    }

    /**
     * Dialog确定按钮的点击响应
     */
    confirm() {
        this.confirmEvent.emit();
        this.close();
    }

    /**
     * 创建模态对话框的遮罩
     */
    _enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.className = 'nb-mask';
            document.body.appendChild(this.mask);
        }
    }
}
