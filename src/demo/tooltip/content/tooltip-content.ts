import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'demo-tooltip-content',
    templateUrl: './tooltip-content.html',
    styleUrls: ['./tooltip-content.less']
})
export class TooltipContentDemo {

    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {

    }

    onIknowthat() {
        this.close.emit();
    }
}
