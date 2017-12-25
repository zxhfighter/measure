import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastConfig, ToastData, ToastDataFilled } from './toast.config';
import { ToastComponent } from './toast';

@Injectable()
export class ToastService {
    private counter: number = 0;
    private component: ToastComponent;
    private idPrefix: string = 'toast';

    constructor(overlay: Overlay) {
        this.component = overlay.create().attach(new ComponentPortal(ToastComponent)).instance;
    }

    private _createToast(toastData: ToastData, options?: ToastConfig): ToastDataFilled {
        const componentOptions: ToastDataFilled = Object.assign(toastData, {
            toastId: this._generateComponentId(),
            options: options,
            createdAt: new Date()
        });
        this.component.createToast(componentOptions);

        return componentOptions;
    }

    private _generateComponentId(): string {
        return `${this.idPrefix}-${this.counter++}`;
    }

    /**
     * create a success toast
     * @default false
     */
    success(content: string, options?: ToastConfig) {
        this._createToast({type: 'success', content: content}, options);
    }

    /**
     * create a error toast
     * @default false
     */
    error(content: string, options?: ToastConfig) {
        this._createToast({type: 'error', content: content}, options);
    }

    /**
     * create a info toast
     * @default false
     */
    info(content: string, options?: ToastConfig) {
        this._createToast({type: 'info', content: content}, options);
    }

    /**
     * create a warn toast
     * @default false
     */
    warn(content: string, options?: ToastConfig) {
        this._createToast({type: 'warning', content: content}, options);
    }

    /**
     * create a toast
     * @default false
     */
    create(type: string, content: string, options?: ToastConfig) {
        this._createToast({type: type as any, content: content}, options);
    }
}
