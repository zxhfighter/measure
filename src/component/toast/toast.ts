import { Optional, Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ToastConfig } from './toast.config';

@Component({
    selector: 'nb-toast',
    templateUrl: './toast.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-toast'
    },
    exportAs: 'nbToast'
})
export class ToastComponent {
    toasts: any = [];
    config: ToastConfig;

    constructor(@Optional() config: ToastConfig,
                protected cd: ChangeDetectorRef) {
        this.config = Object.assign({}, config);
    }

    // Create a new toast
    createToast(toastData: any): void {
        toastData.options = this._mergeOptions(toastData.options);
        this.toasts.push(toastData);
        this.cd.markForCheck();
    }

    // Remove a toastData by toastId
    removeToast(toastId: string): void {
        this.toasts.some((toastData, index) => {
            if (toastData.toastId === toastId) {
                this.toasts.splice(index, 1);
                this.cd.markForCheck();
                return true;
            }
        });
    }

    // Remove all toasts
    removeToastAll() {
        this.toasts = [];
        this.cd.markForCheck();
    }

    // Merge default options and cutom toast options
    protected _mergeOptions(options: ToastConfig): ToastConfig {
        const defaultOptions: ToastConfig = {
            duration: this.config.duration,
            animate: this.config.animate
        };
        return Object.assign(defaultOptions, options);
    }
}
