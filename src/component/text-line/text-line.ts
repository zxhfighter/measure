import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-text-line',
    templateUrl: './text-line.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-text-line'
    }
})
export class TextLineComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
