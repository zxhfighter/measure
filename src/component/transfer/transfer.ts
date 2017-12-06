import {
    Component, 
    Input, 
    Output, 
    EventEmitter,
    OnInit, 
    ViewEncapsulation, 
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-transfer',
    templateUrl: './transfer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-transfer'
    },
    exportAs: 'nbTransfer'
})
export class TransferComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
