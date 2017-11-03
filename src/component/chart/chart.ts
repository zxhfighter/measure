import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'x-chart',
    templateUrl: './chart.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'x-widget x-chart'
    }
})
export class ChartComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
