import {
    Component,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {ToastComponent} from './toast';
import {ToastConfig, ToastDataFilled} from './toast.config';

@Component({
    selector: 'nb-toast-item',
    templateUrl: './toast.item.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    animations: [
        trigger('enterLeave', [
            state('enter', style({opacity: 1, transform: 'translateY(0)'})),
            transition('* => enter', [
                style({opacity: 0, transform: 'translateY(-50%)'}),
                animate('200ms linear')
            ]),
            state('leave', style({opacity: 0, transform: 'translateY(-50%)'})),
            transition('* => leave', [
                style({opacity: 1, transform: 'translateY(0)'}),
                animate('100ms linear')
            ])
        ])
    ]
})
export class ToastItemComponent implements OnInit, OnDestroy {
    @Input() toast: ToastDataFilled;

    // Shortcut reference to toast.options
    protected options: ToastConfig;

    // Whether record timeout to auto destroy self
    private autoErase: boolean;
    private timer: number = null;

    constructor(protected toastComponent: ToastComponent,
                protected cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.options = this.toast.options;

        if (this.options.animate) {
            this.toast.state = 'enter';
            this.cd.markForCheck();
        }

        this.autoErase = this.options.duration > 0;

        if (this.autoErase) {
            this._startEraseTimeout();
        }
    }

    ngOnDestroy() {
        if (this.autoErase) {
            this._clearEraseTimeout();
        }
    }

    // Remove self
    protected _destroy() {
        if (this.options.animate) {
            this.toast.state = 'leave';
            this.cd.markForCheck();
            setTimeout(() => this.toastComponent.removeToast(this.toast.toastId), 200);
        }
        else {
            this.toastComponent.removeToast(this.toast.toastId);
        }
    }

    private _startEraseTimeout() {
        if (this.options.duration > 0) {
            this._clearEraseTimeout();
            console.log(this.options.duration);
            this.timer = window.setTimeout(() => this._destroy(), this.options.duration);
            this.cd.markForCheck();
        }
        else {
            this._destroy();
        }
    }

    private _clearEraseTimeout() {
        if (this.timer !== null) {
            window.clearTimeout(this.timer);
            this.timer = null;
            this.cd.markForCheck();
        }
    }
}
