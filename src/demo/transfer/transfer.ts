import {
    Component, 
    OnInit, 
    ChangeDetectionStrategy
} from '@angular/core';

import {candidateData, selectedData} from './transfer-test-data';

@Component({
    selector: 'demo-transfer',
    templateUrl: './transfer.html',
    styleUrls: ['./transfer.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTransfer implements OnInit {

    private candidateData = candidateData;

    private selectedData = selectedData;

    constructor() {

    }

    ngOnInit() {

    }
}
