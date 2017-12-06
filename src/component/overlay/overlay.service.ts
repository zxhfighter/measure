import {
    Inject,
    Injector,
    Injectable,
    TemplateRef,
    ViewRef,
    ElementRef,
    EmbeddedViewRef,
    ViewContainerRef,
    Renderer2,
    NgZone,
    Host,
    SkipSelf,
    ComponentRef,
    ComponentFactory,
    ComponentFactoryResolver
} from '@angular/core';
import { ConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos, ConnectionPositionPair, Placement } from '../util/position';
import { PositionStrategy } from '../util/connected-position.strategy';
import { OverlayPositionService } from './overlay-position.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { auditTime } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { ViewportRuler } from './scroll-strategy';

export class ContentRef {
    constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) { }
}

export interface ComponentType<T> {
    new (...args: any[]): T;
  }

export class ComponentRefer<T> {
    component: ComponentType<T>;
    viewContainerRef?: ViewContainerRef | null;
    injector?: Injector | null;

    constructor(
        component: ComponentType<T>,
        viewContainerRef?: ViewContainerRef | null,
        injector?: Injector | null) {

        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
}

@Injectable()
export class OverlayService<T> {
    private _windowFactory: ComponentFactory<T>;
    private _windowRef: ComponentRef<T> | null;
    private overlayComponent: any;
    private _contentRef: ContentRef | null;
    private positionStrategy: PositionStrategy;
    private originElement: ElementRef;
    originPos: ConnectionPosition;
    overlayPos: ConnectionPosition;
    placement: string;

    /** Subscription to viewport resize events. */
    _resizeSubscription = Subscription.EMPTY;

    /** Stream of viewport change events. */
    _change: Observable<Event>;

    constructor(
        private _injector: Injector,
        private _renderer: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private overlayPositionService: OverlayPositionService,
        private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    createOverlayFromTemplate(
        type: any,
        content: string | TemplateRef<any>,
        appendToBody?: boolean,
        context?: any): ComponentRef<T> {

        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowFactory = this._componentFactoryResolver.resolveComponentFactory<T>(type);
            this._windowRef =
                this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, this._contentRef.nodes);
        }

        if (appendToBody) {
            let overlayRootNode = this.getComponentRootNode(this._windowRef);
            window.document.body.appendChild(overlayRootNode);
        }
        this.overlayComponent = this._windowRef!.instance;

        return this._windowRef;
    }

    attachOverlay(
        originElement: ElementRef,
        placement: Placement) {

        this.originElement = originElement;
        this.placement = placement;
        this.overlayPositionService
            .setOverlayRef(this.overlayComponent)
            .attachTo(originElement, placement);
        this.overlayComponent.needReposition.subscribe(() => this.overlayPositionService.updatePosition());
    }

    createOverlayFromComponent(overlayComponent: any,
        originElement: ElementRef,
        placement: string,
        appendToBody?: boolean) {

        if (appendToBody) {
            window.document.body.appendChild(overlayComponent.el.nativeElement);
        }

        this.originElement = originElement;
        this.placement = placement;
        this.overlayComponent = overlayComponent;
        this.overlayComponent.needReposition.subscribe(() => this.overlayPositionService.updatePosition());

        return this.overlayComponent;
    }

    close() {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;

            let viewRef = this._contentRef!.viewRef;
            if (viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(viewRef));
                this._contentRef = null;
            }
        }
        this._resizeSubscription.unsubscribe();
    }

    private _getContentRef(content?: string | TemplateRef<any>, context?: any): ContentRef {
        if (!content) {
            return new ContentRef([]);
        } else if (content instanceof TemplateRef) {
            const viewRef = this._viewContainerRef.createEmbeddedView(<TemplateRef<T>>content, context);
            return new ContentRef([viewRef.rootNodes], viewRef);
        } else {
            return new ContentRef([[this._renderer.createText(`${content}`)]]);
        }
    }

    getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
}

