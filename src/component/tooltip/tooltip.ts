import {
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    Input,
    Output,
    Directive,
    ElementRef,
    TemplateRef,
    Renderer2,
    ViewContainerRef,
    ComponentRef,
    Injector,
    NgZone,
    EventEmitter,
    ComponentFactory,
    ComponentFactoryResolver
} from '@angular/core';

import { OnChange } from '../core/decorators';
import { TiplayerComponent } from './tiplayer';
import { ConnectionPosition, Placement } from '../util/position';
import { OverlayPositionService } from '../overlay/overlay-position.service';
import { DynamicComponentService } from '../overlay/dynamic-component.service';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[nbTooltip]',
    exportAs: 'nbTooltip',
    providers: [DynamicComponentService, OverlayPositionService],
    host: {
        '(body:click)': 'handleBodyInteraction()'
    }
})

export class TooltipDirective implements OnInit, OnChanges, OnDestroy {

    /**
     * 提示框的内容
     *
     */
    @Input() nbTooltip: string | TemplateRef<any> = '';

    /**
     * 提示框位置信息，默认为目标元素的底部
     * 可选值为 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' |
     * 'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom'
     * @default bottom
     */
    @OnChange()
    @Input() placement: Placement = 'bottom';

    /**
     * 浮层模式还是嵌入模式
     * @default false
     */
    @OnChange(true)
    @Input() embedded: boolean = false;

    /**
     * 提示框的触发事件类型
     * 可选值为 'click' | 'hover' | 'focus'
     * @default hover
     */
    @Input() trigger: string = 'hover';

    /**
     * 是否有箭头
     * @default false
     */
    @OnChange(true)
    @Input() hasArrow: boolean = false;

    /**
     * 提示框主题色
     * 可选值为 'default' | white' | 'pink' | 'yellow'
     * @default default
     *
     */
    @Input() nbTooltipTheme: string = 'default';

    private _content: string;
    private clickListener: Function;
    private enterListener: Function;
    private leaveListener: Function;
    private focusListener: Function;
    private blurListener: Function;
    private tiplayerInstance: TiplayerComponent | null;
    private positionStrategy;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
        private ngZone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver,
        private dynamicComponentService: DynamicComponentService<TiplayerComponent>,
        private overlayPositionService: OverlayPositionService) {
    }

    ngOnInit() {
        // 绑定事件
        if (this.trigger === 'hover') {
            this.enterListener =
                this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.show());
            this.leaveListener =
                this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hide());
        }
        if (this.trigger === 'click') {
            this.clickListener =
                this.renderer.listen(this.el.nativeElement, 'click', (e) => this._handleHostClick(e));
        }
        if (this.trigger === 'focus') {
            this.focusListener =
                this.renderer.listen(this.el.nativeElement, 'focus', () => this.show());
            this.blurListener =
                this.renderer.listen(this.el.nativeElement, 'blur', () => this.hide());
        }
    }

    /**
     * 截获Tooltip内容的变化，重新渲染
     * 仅支持Tooltip内容为 string 类型
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes['nbTooltip']) {
            if (this.tiplayerInstance) {
                this.tiplayerInstance.changeContent(this.nbTooltip);
            }
        }
    }

    /**
     * 创建并显示Tooltip
     */
    show() {
        if (!this.tiplayerInstance) {
            this._createTiplayer();
        }
        this.tiplayerInstance!.show();
    }

    /**
     * 隐藏Tooltip
     */
    hide() {
        if (this.tiplayerInstance) {
            this.tiplayerInstance.hide();
        }
    }

    /**
     * 显示或隐藏Tooltip
     */
    toggle() {
        this.isTooltipVisible() ? this.hide() : this.show();
    }

    /**
     * Tooltip是否显示
     */
    isTooltipVisible(): boolean {
        return !!this.tiplayerInstance && this.tiplayerInstance.isVisible();
    }

    /**
     * 处理宿主元素上的点击
     * @param { Event } event - click event
     *
     */
    _handleHostClick(event) {
        this.toggle();
        event.stopPropagation();
    }

    /**
     * 打开一个宿主元素的提示时，动态创建一个提示框组件
     * 根据是否为嵌入方式，决定创建在当前元素的container内还是挂载到body下面
     *
     */
    _createTiplayer() {
        let hostElement;
        if (!this.embedded) {
            hostElement = window.document.body;
        }

        let componentRef = this.dynamicComponentService.createDynamicComponent(
            TiplayerComponent, this.nbTooltip, hostElement);
        this.tiplayerInstance = componentRef.instance;

        const config = {
            trigger: this.trigger,
            hasArrow: this.hasArrow,
            embedded: this.embedded,
            placement: this.placement,
            nbTooltipTheme: this.nbTooltipTheme
        };
        Object.keys(config).forEach(key => this.tiplayerInstance![key] = config[key]);

        const positionStrategy = this.overlayPositionService
            .attachTo(this.el, this.tiplayerInstance, this.placement);

        this.positionStrategy = positionStrategy;
        // this.tiplayerInstance.positionStrategy = positionStrategy;
        this.tiplayerInstance.needReposition.subscribe(
            () => this.overlayPositionService.updatePosition(positionStrategy)
        );
    }

    /**
     * 重新定位Tooltip
     */
    needReposition() {
        if (this.positionStrategy) {
            this.overlayPositionService.updatePosition(this.positionStrategy);
        }
    }

    ngOnDestroy() {
        if (this.tiplayerInstance) {
            this.tiplayerInstance = null;
        }
        if (this.trigger === 'click') {
            this.clickListener();
        }
        if (this.trigger === 'hover') {
            this.enterListener();
            this.leaveListener();
        }
        if (this.trigger === 'focus') {
            this.focusListener();
            this.blurListener();
        }
    }

    /**
     * 处理body区域内的点击
     *
     */
    handleBodyInteraction() {
        if (this.trigger === 'click') {
            this.hide();
        }
    }
}
