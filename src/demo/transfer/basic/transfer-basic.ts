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

    candidateData = candidateData;

    selectedData = selectedData;

    disabled = true;

    getValue(event) {
        console.log(event);
    }
}
