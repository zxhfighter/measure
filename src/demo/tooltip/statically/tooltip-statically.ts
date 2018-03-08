import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { OverlayOriginDirective, OverlayComponent } from '../../../component/overlay';

@Component({
    selector: 'demo-tooltip-statically',
    templateUrl: './tooltip-statically.html',
    styleUrls: ['./tooltip-statically.less']
})
export class TooltipStaticallyDemo implements OnInit {

    @ViewChild('origin') origin: OverlayOriginDirective;
    @ViewChild('overlay') overlay: OverlayComponent;

    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {

    }

    ngOnInit() {
        this.overlay.origin = this.origin;
    }

    onIknowthat() {
        this.close.emit();
    }

    onToggle() {
        this.overlay.isVisible() ? this.overlay.hide() : this.overlay.show();
    }
}
