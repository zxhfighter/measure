import {
    Injector,
    Injectable,
    TemplateRef,
    ViewRef,
    ElementRef,
    EmbeddedViewRef,
    ViewContainerRef,
    Renderer2,
    NgZone,
    ComponentRef,
    ComponentFactory,
    ComponentFactoryResolver
} from '@angular/core';
import { ConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos, ConnectionPositionPair } from './position';
import { PositionStrategy } from '../util/position.strategy';
import { OverlayPositionService } from './overlay-position.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { auditTime } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

export class ContentRef {
    constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) { }
}

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
    firstPlacement: string;
    seconedPlacement: string;

    /** Subscription to viewport resize events. */
    _resizeSubscription = Subscription.EMPTY;

    /** Stream of viewport change events. */
    _change: Observable<Event>;
    private overlayServiceService: OverlayPositionService;

    constructor(
        type: any,
        private _injector: Injector,
        private _viewContainerRef: ViewContainerRef,
        private _renderer: Renderer2,
        componentFactoryResolver: ComponentFactoryResolver,
        private ngZone: NgZone) {
        this._windowFactory = componentFactoryResolver.resolveComponentFactory<T>(type);
        this._change = ngZone.runOutsideAngular(() => {
            return merge<Event>(fromEvent(window, 'resize'), fromEvent(window.document, 'scroll'));
        });
        this.overlayServiceService = new OverlayPositionService(this.overlayComponent, ngZone);
    }

    createOverlay(content: string | TemplateRef<any>,
        originElement: ElementRef,
        placement: string,
        appendToBody?: boolean,
        context?: any): ComponentRef<T> {

        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef =
                this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, this._contentRef.nodes);
        }

        if (appendToBody) {
            let overlayRootNode = this.getComponentRootNode(this._windowRef);
            window.document.body.appendChild(overlayRootNode);
        }

        this.originElement = originElement;
        this.placement = placement;
        let [firstPlacement, seconedPlacement] = placement.split('-');
        this.firstPlacement = firstPlacement;
        this.seconedPlacement = seconedPlacement;
        this.overlayComponent = this._windowRef.instance;

        this.overlayComponent.needReposition.subscribe(() => this.overlayServiceService.updatePosition());

        let originPos = this.overlayServiceService.getOriginPosition(placement);
        let overlayPos = this.overlayServiceService.getOverlayPosition(placement);
        this.overlayServiceService.attachTo(originElement, originPos, overlayPos);

        return this._windowRef;
    }

    createOverlayFromExistingComponent(overlayComponent: any,
        originElement: ElementRef,
        placement: string,
        appendToBody?: boolean) {

        if (appendToBody) {
            window.document.body.appendChild(overlayComponent.el.nativeElement);
        }

        this.originElement = originElement;
        this.placement = placement;
        let [firstPlacement, seconedPlacement] = placement.split('-');
        this.firstPlacement = firstPlacement;
        this.seconedPlacement = seconedPlacement;
        this.overlayComponent = overlayComponent;
        this.overlayComponent.needReposition.subscribe(() => this.overlayServiceService.updatePosition());

        let originPos = this.overlayServiceService.getOriginPosition(placement);
        let overlayPos = this.overlayServiceService.getOverlayPosition(placement);
        this.overlayServiceService.attachTo(originElement, originPos, overlayPos);

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
