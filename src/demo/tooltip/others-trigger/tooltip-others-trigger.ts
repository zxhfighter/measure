import { Component, ViewChild } from '@angular/core';
import { TooltipDirective } from '../../../component/tooltip';

@Component({
    selector: 'demo-tooltip-others-trigger',
    templateUrl: './tooltip-others-trigger.html',
    styleUrls: ['./tooltip-others-trigger.less']
})
export class TooltipOthersTriggerDemo {

    @ViewChild('genuineOrigin') tooltip: TooltipDirective;

    showIsolateTip() {
        const isVisible = this.tooltip.isTooltipVisible();
        if (!isVisible) {
            this.tooltip.show();
        }
    }
}
