import {
    Component,
    ChangeDetectionStrategy,
    OnInit
} from '@angular/core';

import {
    candidateDataEmpty,
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

export class TransferBasicDemo implements OnInit {

    candidateData = candidateData;

    selectedData = selectedData;

    allSelectLink = false;

    allDeleteLink = true;

    candidateDataEmpty: any = [];

    selectedDataEmpty = [];

    ngOnInit() {
        setTimeout(() => {
            this.candidateDataEmpty = candidateDataEmpty;
            this.selectedDataEmpty = JSON.parse(JSON.stringify(candidateData));
        }, 1000);
    }

    disabled = true;

    getValue(event) {
        console.log(event);
    }
}
