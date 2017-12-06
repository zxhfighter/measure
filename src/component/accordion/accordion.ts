import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-accordion',
    templateUrl: './accordion.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-accordion'
    },
    exportAs: 'nbAccordion'
})
export class AccordionComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
