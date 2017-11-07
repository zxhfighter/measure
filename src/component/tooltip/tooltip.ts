import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-tooltip',
    templateUrl: './tooltip.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-tooltip'
    }
})
export class TooltipComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
