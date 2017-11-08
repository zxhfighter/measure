import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    Directive,
    ElementRef,
    TemplateRef,
    Renderer2,
    EmbeddedViewRef,
    ViewContainerRef,
    ComponentRef,
    ComponentFactory,
    ComponentFactoryResolver
} from '@angular/core';

import { TiplayerComponent } from './tiplayer';
import { ConnectionPosition } from './position';
import { PositionStrategy } from './position.strategy';

@Directive({
    selector: '[nbTooltip]',
    host: {
        '(body:click)': 'this.handleBodyInteraction()'
    }
})

export class TooltipDirective implements OnInit, OnDestroy {

    private _content: string;
    private clickListener: Function;
    private enterListener: Function;
    private leaveListener: Function;
    private tiplayerInstance: TiplayerComponent | null;

    @Input() nbTooltip: string = '';

    /**
     * 提示框位置信息，默认为目标元素的底部
     * 可选值为 'top' | 'bottom' | 'left' | 'right'
     *
     */
    @Input() placement: string = 'bottom';

    /**
     * 提示框的触发事件类型
     * 可选值为 'click' | 'hover'
     *
     */
    @Input() trigger: string = 'hover';

    constructor(
        private el: ElementRef,
        private _renderer: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        // 绑定事件
        if (this.trigger === 'hover') {
            this.enterListener =
                this._renderer.listen(this.el.nativeElement, 'mouseenter', () => this.open());
            this.leaveListener =
                this._renderer.listen(this.el.nativeElement, 'mouseleave', () => this.close());
        }
        if (this.trigger === 'click') {
            this.clickListener =
                this._renderer.listen(this.el.nativeElement, 'click', (e) => this.handleHostClick(e));
        }
    }

    open() {
        if (!this.tiplayerInstance) {
            this.createTiplayer();
        }
        else {
            this.tiplayerInstance.show();
        }
    }

    close() {
        if (this.tiplayerInstance) {
            this.tiplayerInstance.hide();
        }
    }

    toggle() {
        this.isTooltipVisible() ? this.close() : this.open();
    }

    isTooltipVisible(): boolean {
        return !!this.tiplayerInstance && this.tiplayerInstance.isVisible();
    }

    handleHostClick(e) {
        this.toggle();
        e.stopPropagation();
    }

    /**
     * 创建提示层
     *
     */
    createTiplayer() {
        let windowFactory =
            this.componentFactoryResolver.resolveComponentFactory<TiplayerComponent>(TiplayerComponent);
        let componentRef =
            this._viewContainerRef.createComponent(windowFactory);
        let tiplayerRootNode = this.getComponentRootNode(componentRef);
        window.document.body.appendChild(tiplayerRootNode);

        this.tiplayerInstance = componentRef.instance;
        this.tiplayerInstance.content = this.nbTooltip;
        this.tiplayerInstance.placement = this.placement;

        let originPos = this.getOriginPosition();
        let overlayPos = this.getOverlayPosition();
        componentRef.instance.attachTo(this.el, originPos, overlayPos);
    }

    getOriginPosition(): ConnectionPosition {
        let firstPlacement = this.placement.split('-')[0];
        let seconedPlacement = this.placement.split('-')[1];
        let horizontal;
        let vertical;
        if (firstPlacement === 'top' || firstPlacement === 'bottom') {
            vertical = firstPlacement;
        }

        if (firstPlacement === 'left') {
            horizontal = 'start';
        }

        if (firstPlacement === 'right') {
            horizontal = 'end';
        }

        if (seconedPlacement === 'left') {
            horizontal = 'start';
        }

        if (seconedPlacement === 'right') {
            horizontal = 'end';
        }

        if (seconedPlacement === 'top' || seconedPlacement === 'bottom') {
            vertical = seconedPlacement;
        }

        if (seconedPlacement == null) {
            if (firstPlacement === 'top' || firstPlacement === 'bottom') { 
                horizontal = 'center';
            }
            else {
                vertical = 'center';
            }
        }

        if (typeof horizontal === 'undefined' || typeof vertical === 'undefined') {
            throw this.getInvalidplacementError(this.placement);
        }

        return {
            horizontal: horizontal,
            vertical: vertical
        };

        // if (this.placement === 'top' || this.placement === 'bottom') {
        //     return { horizontal: 'center', vertical: this.placement };
        // }

        // if (this.placement === 'left') {
        //     return { horizontal: 'start', vertical: 'center' };
        // }

        // if (this.placement === 'right') {
        //     return { horizontal: 'end', vertical: 'center' };
        // }
    }

    getOverlayPosition(): ConnectionPosition {
        let firstPlacement = this.placement.split('-')[0];
        let seconedPlacement = this.placement.split('-')[1];
        let horizontal;
        let vertical;
        if (firstPlacement === 'top') {
            vertical = 'bottom';
        }
        if (firstPlacement === 'bottom') {
            vertical = 'top';
        }

        if (firstPlacement === 'left') {
            horizontal = 'end';
        }

        if (firstPlacement === 'right') {
            horizontal = 'start';
        }

        if (seconedPlacement === 'left') {
            horizontal = 'start';
        }

        if (seconedPlacement === 'right') {
            horizontal = 'end';
        }

        if (seconedPlacement === 'top' || seconedPlacement === 'bottom') {
            vertical = seconedPlacement;
        }

        if (seconedPlacement == null) {
            if (firstPlacement === 'top' || firstPlacement === 'bottom') { 
                horizontal = 'center';
            }
            else {
                vertical = 'center';
            }
        }

        if (typeof horizontal === 'undefined' || typeof vertical === 'undefined') {
            throw this.getInvalidplacementError(this.placement);
        }

        return {
            horizontal: horizontal,
            vertical: vertical
        };

        // if (this.placement === 'top') {
        //     return { horizontal: 'center', vertical: 'bottom' };
        // }

        // if (this.placement === 'bottom') {
        //     return { horizontal: 'center', vertical: 'top' };
        // }

        // if (this.placement === 'left') {
        //     return { horizontal: 'end', vertical: 'center' };
        // }

        // if (this.placement === 'right') {
        //     return { horizontal: 'start', vertical: 'center' };
        // }

        // throw this.getInvalidplacementError(this.placement);
    }

    ngOnDestroy() {
        if (this.tiplayerInstance) {
            this.tiplayerInstance = null;
        }
        this.clickListener();
        this.leaveListener();
        this.leaveListener();
    }

    handleBodyInteraction() {
        this.close();
    }

    getInvalidplacementError(position: string) {
        return Error(`Tooltip position "${position}" is invalid.`);
    }

    getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
}