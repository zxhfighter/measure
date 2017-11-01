import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-chart',
    templateUrl: './chart.html',
    styleUrls: ['./chart.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoChart implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
