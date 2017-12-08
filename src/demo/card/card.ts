import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-card',
    templateUrl: './card.html',
    styleUrls: ['./card.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CardDemo implements OnInit {

    // basic source
    tsCode: string = require('!!raw-loader!./basic/card-basic.ts');
    htmlCode: string = require('!!raw-loader!./basic/card-basic.html');
    lessCode: string = require('!!raw-loader!./basic/card-basic.less');

    constructor() {

    }

    ngOnInit() {

    }
}
