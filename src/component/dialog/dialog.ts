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
     * Dialog确定按钮的点击响应
     */
    confirm() {
        this.confirmEvent.emit();
        this.hide();
    }
}
