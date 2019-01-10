import {
    Component,
    ChangeDetectionStrategy,
    OnInit
} from '@angular/core';

import {
    candidateDataEmpty,
    candidateData,
    selectedData,
    tableData,
    selectedIds,
    tableConfig,
    multiTableData
} from '../transfer-test-data';
import { Router } from '@angular/router';

@Component({
    selector: 'demo-transfer-basic',
    templateUrl: './transfer-basic.html',
    styleUrls: ['./transfer-basic.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})

export class TransferBasicDemo implements OnInit {

    // tree
    candidateData = candidateData;

    selectedData = selectedData;

    allSelectLink = false;

    allDeleteLink = true;

    candidateDataEmpty: any = [];

    selectedDataEmpty = [];

    // table
    datasource = tableData;

    multiTableData = multiTableData;

    selectedIds = selectedIds;

    tableConfig = tableConfig;

    customClass = 'table-transfer-style';

    // addLink
    addLink = {
        text: '补量人群包',
        flag: true
    };

    // search
    candidateSearch = false;
    selectedSearch = false;

    // title
    candidateTitle = '人群列表';
    selectedTitle = '已选人群';

    // name length limit
    nameLenLimit = 7;

    constructor(
        private router: Router
    ) {}

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

    jump() {
        this.router.navigate(['/components/table']);
    }

    searchValue(event) {
        console.log(event);
    }

    expandNode(event) {
        console.log(event);
    }

    extendData() {
        console.log(1);
    }
}
