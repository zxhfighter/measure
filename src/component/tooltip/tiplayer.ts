/* tslint:disable:no-access-missing-member */
import {
    NgModule,
    Input,
    ChangeDetectorRef,
    Component,
    ViewChild,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterViewInit,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    Output,
    EventEmitter
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { fadeAnimation } from '../core/animation/fade-animations';
import { OverlayPositionService } from '../overlay/overlay-position.service';
import { OverlayComponent } from '../overlay';
import { Placement } from '../overlay/position.interface';

@Component({
    selector: 'nb-tiplayer',
    templateUrl: './tiplayer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OverlayPositionService],
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

export class TiplayerComponent extends OverlayComponent implements OnInit, OnDestroy {

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
     * @default false
     */
    @OnChange(true)
    @Input() hasArrow: boolean = false;

    /**
     * 浮层模式还是嵌入模式
     */
    @Input() embedded: boolean;

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
     * 箭头元素
     */
    @ViewChild('arrow', {static: false}) arrow: ElementRef;

    /**
     * 提示内容子视图，用于变更内容用。e.g slider的提示
     */
    @ViewChild('content', {static: true}) content: ElementRef;

    ngOnInit() {
        super.ngOnInit();
        this.container = this.embedded ? '' : 'body';

        // 由于tooltip可能出现在 select 选项中，因此要比 overlay 高
        this.el.nativeElement.style.zIndex = 1002;
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
        const nativeElement = this.el.nativeElement;
        if (nativeElement && nativeElement.parentNode) {
            nativeElement.parentNode.removeChild(nativeElement);
        }
    }
}
