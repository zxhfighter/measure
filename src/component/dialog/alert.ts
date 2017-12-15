import {
    Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ContentChild,
    ViewChild
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { futimesSync } from 'fs';
import { Event } from '@angular/router/src/events';
import { DialogComponent } from './dialog';

export type AlertType = 'info' | 'error' | 'success';

@Component({
    selector: 'nb-alert',
    templateUrl: './alert.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    exportAs: 'nbAlert',
    host: {
        'class': 'nb-widget nb-alert'
    }
})

export class AlertComponent implements OnInit, AfterViewInit {

    @ViewChild(DialogComponent) dialog;

    @Input() type: AlertType;
    @Input() title: string = '';
    @Input() content: string = '';

    @Input() appendTo: any = 'body';

    @OnChange(true)
    @Input() modalable: boolean = false;

    @OnChange(true)
    @Input() closable: boolean = true;

    visiblity: boolean = false;
    mask: HTMLElement | null;
    maskClickListener: Function;

    @Output() confirmEvent: EventEmitter<Object> = new EventEmitter();
    @Output() cancelEvent: EventEmitter<Object> = new EventEmitter();

    constructor(
        private cdRef: ChangeDetectorRef,
        private el: ElementRef,
        public renderer: Renderer2) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // document.body.appendChild(this.el.nativeElement);
    }

    open() {
        this.dialog.open();
        // this.visiblity = true;
        this.cdRef.markForCheck();
    }

    close() {
        this.dialog.close();
        this.cancelEvent.emit();
        // this.visiblity = false;
        this.cdRef.markForCheck();

        if (this.mask) {
            this.mask.remove();
            this.mask = null;
        }
    }

    ok() {
        this.confirmEvent.emit();
        this.close();
    }
}
