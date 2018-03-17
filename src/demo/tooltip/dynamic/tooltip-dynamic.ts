import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { TooltipDirective } from '../../../component/tooltip';

@Component({
    selector: 'demo-tooltip-dynamic',
    templateUrl: './tooltip-dynamic.html',
    styleUrls: ['./tooltip-dynamic.less']
})
export class TooltipDynamicDemo {

    @ViewChild(TooltipDirective) tooltip: TooltipDirective;

    constructor() {
    }

    onIknowthat() {
        this.tooltip.hide();
    }
}
