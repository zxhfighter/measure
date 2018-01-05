import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-grid',
    templateUrl: './grid.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-grid'
    },
    exportAs: 'nbGrid'
})
export class GridComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
