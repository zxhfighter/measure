import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-tooltip',
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTooltip implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
