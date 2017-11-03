import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'x-code-highlighter',
    templateUrl: './code-highlighter.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'x-widget x-code-highlighter'
    }
})
export class CodeHighlighterComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
