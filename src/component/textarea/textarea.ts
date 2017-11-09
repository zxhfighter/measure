import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-textarea',
    templateUrl: './textarea.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-textarea'
    }
})
export class TextareaComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
