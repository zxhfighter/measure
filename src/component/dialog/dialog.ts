import {
    Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ContentChild,
    ViewChild
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { futimesSync } from 'fs';
import { Event } from '@angular/router/src/events';
import { DialogHeaderComponent } from './dialog-header';
import { DialogBodyComponent } from './dialog-body';
import { DialogFooterComponent } from './dialog-footer';

@Component({
    selector: 'nb-dialog',
    templateUrl: './dialog.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget'
    }
})

export class DialogComponent implements OnInit, AfterViewInit {

    @ViewChild('overlay') overlay;

    @Input() overlayClass: string = '';
    @Input() title: string = '';

    @Input() appendTo: any = 'body';

    @OnChange(true)
    @Input() modalable: boolean = false;

    @OnChange(true)
    @Input() closable: boolean = true;

    // visiblity: boolean = false;
    mask: HTMLElement | null;
    maskClickListener: Function;

    @Output() openHandler: EventEmitter<Object> = new EventEmitter();
    @Output() closeHandler: EventEmitter<Object> = new EventEmitter();
    @Output() confirmEvent: EventEmitter<Object> = new EventEmitter();

    constructor(
        private cdRef: ChangeDetectorRef,
        private el: ElementRef,
        public renderer: Renderer2) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    open() {
        this.overlay.show();
        this.openHandler.emit();

        if (this.modalable) {
            this.enableModality();
        }
    }

    close() {
        this.overlay.hide();
        this.closeHandler.emit();

        if (this.mask) {
            this.mask.remove();
            this.mask = null;
        }
    }

    confirm() {
        this.confirmEvent.emit();
        this.close();
    }

    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.className = 'nb-mask';
            document.body.appendChild(this.mask);
        }
    }
}
