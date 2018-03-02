import {
    NgModule,
    Input,
    Component,
    ViewChild,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterViewInit,
    ElementRef,
    OnDestroy,
    Output,
    EventEmitter
} from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { OverlayComponent } from '../overlay';
import { Placement } from '../overlay/position.interface';

@Component({
    selector: 'nb-tiplayer',
    templateUrl: './tiplayer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [ fadeAnimation ],
    exportAs: 'nbTiplayer',
    host: {
        'class': 'nb-widget nb-tiplayer',
        '[class.invisible]': '!visibility',
        '[class.nb-tiplayer-embedded]': 'embedded',
        '(mouseenter)': 'this.onMouseEnter()',
        '(mouseleave)': 'this.onMouseLeave()',
        '(click)': '_preventDefault($event)'
    }
})

export class TiplayerComponent extends OverlayComponent implements AfterViewInit, OnDestroy {

    /**
     * 提示框宽度
     */
    @Input() nbWidth: number;

    /**
     * 提示框高度
     */
    @Input() nbHeight: number;

    /**
     * 提示框
     */
    @Input() nbTooltipClass: string;

    /**
     * 提示框主题色
     * 可选值为 'default' | white' | 'pink' | 'yellow'
     */
    @Input() nbTooltipTheme: string;

    /**
     * 提示框的触发事件类型
     * 可选值为 'click' | 'hover' | 'focus'
     */
    @Input() trigger: string;

    /**
     * 是否有箭头
     */
    @Input() hasArrow: boolean;

    /**
     * 浮层模式还是嵌入模式
     */
    @Input() embedded: boolean;

    /**
     * 提示框位置信息，默认为目标元素的底部
     * 可选值为 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' |
     * 'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom'
     */
    @Input()
    get placement () {
        return this._placement;
    }
    set placement(data) {
        this._placement = data;
        this.firstPlacement = this._placement.split('-')[0];
        this.cdRef.markForCheck();
    }

    _placement: Placement;

    /**
     * 位置信息中的第一级位置
     */
    firstPlacement: string;

    /**
     * 变更可见性时的延迟时间
     * @default 200
     */
    @Input() delay: number = 200;

    /**
     * 需要重新定位的事件
     */
    @Output() needReposition: EventEmitter<Object> = new EventEmitter();

    /**
     * 提示内容子视图，用于变更内容用。e.g slider的提示
     */
    @ViewChild('content') content: ElementRef;

    /**
     * 提示框的可见性
     * @default true
     */
    visibility: boolean = false;

    ngAfterViewInit() {
        this.needReposition.emit();
    }

    /**
     * 变更提示框的内容，e.g slider的提示
     * @param { string } content
     */
    changeContent(content) {
        this.content.nativeElement.innerHTML = content;
    }

    /**
     * 处理提示框中的mouseEnter事件
     */
    onMouseEnter() {
        if (this.trigger !== 'hover') {
            return;
        }
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
        }
    }

    /**
     * 处理提示框中的mouseLeave事件
     */
    onMouseLeave() {
        if (this.trigger !== 'hover') {
            return;
        }
        this.hide();
    }

    ngOnDestroy() {
        this.el.nativeElement.remove();
    }
}
