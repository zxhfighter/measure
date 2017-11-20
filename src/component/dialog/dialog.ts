import {
    Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { futimesSync } from 'fs';
import { Event } from '@angular/router/src/events';

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

    @Input() title: string = '标题';

    @Input() appendTo: any = 'body';

    @OnChange(true)
    @Input() modal: boolean = true;

    @OnChange(true)
    @Input() closable: boolean = true;

    visiblity: boolean = false;
    mask: HTMLElement | null;
    maskClickListener: Function;

    constructor(
        private cdRef: ChangeDetectorRef,
        private el: ElementRef,
        public renderer: Renderer2) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if (this.appendTo) {
            if (this.appendTo === 'body') {
                document.body.appendChild(this.el.nativeElement);
            }
            else {
                this.appendTo.appendChild(this.el.nativeElement);
            }
        }
    }

    show() {
        this.visiblity = true;
        this.cdRef.markForCheck();

        if (this.modal) {
            this.enableModality();
        }
    }

    close() {
        this.visiblity = false;
        this.cdRef.markForCheck();

        if (this.mask) {
            this.mask.remove();
            this.mask = null;
        }
    }

    confirm() {
        this.close();
    }

    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.className = 'nb-mask';
            this.maskClickListener = this.renderer.listen(this.mask, 'click', () => {
                this.close();
            });
            document.body.appendChild(this.mask);
        }
    }
}
