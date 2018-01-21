import {
    Injector,
    Injectable,
    TemplateRef,
    ViewRef,
    ElementRef,
    EmbeddedViewRef,
    ViewContainerRef,
    Renderer2,
    ComponentRef,
    ComponentFactory,
    ComponentFactoryResolver
} from '@angular/core';
import { ConnectionPosition } from './position.interface';
import { Subscription } from 'rxjs/Subscription';

/**
 * Class that allows for inserting Text or TemplateRef.
 */
export class ContentRef {
    constructor(public nodes: any[], public viewRef?: ViewRef, public _componentRef?: ComponentRef<any>) { }
}

@Injectable()
export class DynamicComponentService<T> {

    /** created component reference */
    private _componentRef: ComponentRef<T> | null;

    /** places a new component as the content */
    private _contentRef: ContentRef | null;

    /** Subscription to viewport resize events. */
    private _resizeSubscription = Subscription.EMPTY;

    /** attachment element's calculated position */
    originPos: ConnectionPosition;

    /** overlay element's calculated position */
    overlayPos: ConnectionPosition;

    /** overlay element's original position such as 'bottom-top' */
    placement: string;

    constructor(
        private _injector: Injector,
        private _renderer: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    /**
     * create the given component or text to DOM element using the ComponentFactoryResolver.
     *
     * @param { any } type
     * @param { string | TemplateRef<any> } content
     * @param { Element } hostDomElement
     * @param { any } context
     * @return { ComponentRef<T> } _componentRef
     */
    createDynamicComponent(
        type: any,
        content: string | TemplateRef<any>,
        hostDomElement?: Element,
        context?: any): ComponentRef<T> {

        let windowFactory: ComponentFactory<T>;
        if (!this._componentRef) {
            this._contentRef = this._getContentRef(content, context);
            windowFactory = this._componentFactoryResolver.resolveComponentFactory<T>(type);
            this._componentRef =
                this._viewContainerRef.createComponent(windowFactory, 0, this._injector, this._contentRef.nodes);
        }

        if (hostDomElement) {
            let overlayRootNode = this.getComponentRootNode(this._componentRef);
            hostDomElement.appendChild(overlayRootNode);
        }

        return this._componentRef;
    }

    /**
     * dispose the created component and remove from the body and unsubscribe event
     */
    dispose() {
        if (this._componentRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
            this._componentRef = null;

            let viewRef = this._contentRef!.viewRef;
            if (viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(viewRef));
                this._contentRef = null;
            }
        }
        this._resizeSubscription.unsubscribe();
    }

    /**
     * get content from given content
     * @param { string | TemplateRef<any> } content
     * @param { any } context
     * @return { ContentRef }
     */
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

    /**
     * get component's root node for appending given element
     * @param { string | TemplateRef<any> } content
     * @return { HTMLElement }
     */
    getComponentRootNode(_componentRef: ComponentRef<any>): HTMLElement {
        return (_componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
}
