import {Injectable} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ToastConfig, ToastData, ToastDataFilled} from './toast.config';
import {ToastComponent} from './toast';

@Injectable()
export class ToastService {
    protected counter: number = 0;
    protected component: ToastComponent;
    protected idPrefix: string = 'toast';

    constructor(overlay: Overlay) {
        this.component = overlay.create().attach(new ComponentPortal(ToastComponent)).instance;
    }

    remove(toastId?: string): void {
        if (toastId) {
            this.component.removeToast(toastId);
        } else {
            this.component.removeToastAll();
        }
    }

    createToast(toastData: ToastData, options?: ToastConfig): ToastDataFilled {
        const componentOptions: ToastDataFilled = Object.assign(toastData, {
            toastId: this._generateComponentId(),
            options: options,
            createdAt: new Date()
        });
        this.component.createToast(componentOptions);

        return componentOptions;
    }

    protected _generateComponentId(): string {
        return `${this.idPrefix}-${this.counter++}`;
    }

    // Shortcut methods
    success(content: string, options?: ToastConfig) {
        return this.createToast({type: 'success', content: content}, options);
    }

    error(content: string, options?: ToastConfig) {
        return this.createToast({type: 'error', content: content}, options);
    }

    info(content: string, options?: ToastConfig) {
        return this.createToast({type: 'info', content: content}, options);
    }

    warn(content: string, options?: ToastConfig) {
        return this.createToast({type: 'warning', content: content}, options);
    }

    create(type: string, content: string, options?: ToastConfig) {
        return this.createToast({type: type as any, content: content}, options);
    }
}
