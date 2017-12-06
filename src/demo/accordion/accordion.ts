import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-accordion',
    templateUrl: './accordion.html',
    styleUrls: ['./accordion.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoAccordion implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
