import {
    Injector,
    Injectable,
    TemplateRef,
    ViewRef,
    ElementRef,
    EmbeddedViewRef,
    ViewContainerRef,
    Renderer2,
    ContentRef,
    NgZone,
    ComponentRef,
    ComponentFactory,
    ComponentFactoryResolver
} from '@angular/core';
import { DialogComponent } from './dialog';
import { AlertComponent } from './alert';
import { OverlayService } from '../overlay/overlay.service';

export class DialogService<T> {

    private _windowFactory: ComponentFactory<T>;
    private _contentRef: ContentRef | null;
    private _windowRef: ComponentRef<T> | null;
    private overlayService: OverlayService<AlertComponent>;
    private dialogInstance: AlertComponent;

    constructor(
        private _injector: Injector,
        private _viewContainerRef: ViewContainerRef,
        private _renderer: Renderer2,
        componentFactoryResolver: ComponentFactoryResolver,
        private ngZone: NgZone) {

            this.overlayService = new OverlayService<AlertComponent>(
                AlertComponent,
                _injector,
                _viewContainerRef,
                _renderer,
                componentFactoryResolver,
                ngZone);
    }

    createOverlay(type, content, title) {
        let componentRef = this.overlayService.createDialog('');

        this.dialogInstance = componentRef.instance;

        const config = {
            type: type,
            title: title,
            content: content
        };
        Object.keys(config).forEach(key => this.dialogInstance![key] = config[key]);
        this.dialogInstance.open();
    }

    info(content: string, title: string) {
        this.createOverlay('info', content, title);
    }

    error(content: string, title: string) {
        this.createOverlay('error', content, title);
    }

    success(content: string, title: string) {
        this.createOverlay('success', content, title);
    }
}
