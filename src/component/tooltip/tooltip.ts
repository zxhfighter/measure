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
    providers: [DynamicComponentService],
    host: {
        '(body:click)': 'this.handleBodyInteraction()'
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
                this.renderer.listen(this.el.nativeElement, 'click', (e) => this.handleHostClick(e));
        }
        if (this.trigger === 'focus') {
            this.focusListener =
                this.renderer.listen(this.el.nativeElement, 'focus', () => this.show());
            this.blurListener =
                this.renderer.listen(this.el.nativeElement, 'blur', () => this.hide());
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['nbTooltip']) {
            if (this.isTooltipVisible()) {
                this.tiplayerInstance!.changeContent(this.nbTooltip);
            }
        }
    }

    show() {
        if (!this.tiplayerInstance) {
            this.createTiplayer();
        }
        this.tiplayerInstance!.show();
    }

    hide() {
        if (this.tiplayerInstance) {
            this.tiplayerInstance.hide();
        }
    }

    toggle() {
        this.isTooltipVisible() ? this.hide() : this.show();
    }

    isTooltipVisible(): boolean {
        return !!this.tiplayerInstance && this.tiplayerInstance.isVisible();
    }

    /**
     * 处理宿主元素上的点击
     * @param { Event } event - click event
     *
     */
    handleHostClick(event) {
        this.toggle();
        event.stopPropagation();
    }

    /**
     * 打开一个宿主元素的提示时，动态创建一个提示框组件
     * 根据是否为嵌入方式，决定创建在当前元素的container内还是挂载到body下面
     *
     */
    createTiplayer() {
        let hostElement;
        if (!this.embedded) {
            hostElement = window.document.body;
        }

        this.nbTooltip = 'wfj';
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

        this.tiplayerInstance.needReposition.subscribe(
            () => this.overlayPositionService.updatePosition(positionStrategy)
        );
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
