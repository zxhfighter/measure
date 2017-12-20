import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import {
    candidateData,
    selectedData
} from '../transfer-test-data';

@Component({
    selector: 'demo-transfer-basic',
    templateUrl: './transfer-basic.html',
    styleUrls: ['./transfer-basic.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})

export class TransferBasicDemo {

    private candidateData = candidateData;

    private selectedData = selectedData;

    private disabled = true;

    getValue(event) {
        console.log(event)
    }
}
