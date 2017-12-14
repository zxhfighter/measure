import { Component } from '@angular/core';
import { SelectConfig } from "../../../component/select/select.config";

@Component({
    selector: 'demo-select-href',
    templateUrl: './select-href.html',
    styleUrls: ['./select-href.less']
})
export class SelectHrefDemo {
    protected selectedData1: SelectConfig;
    protected selectedData2: SelectConfig;
    protected selectedData3: number = 2;
    protected selectedData4: SelectConfig;
    protected datasource: SelectConfig[] = [
        {
            label: '下拉选项1',
            value: 1
        },
        {
            label: '下拉选项下拉选项下拉选项22',
            value: 2
        },
        {
            label: '下拉选项3',
            value: 3
        },
        {
            label: '下拉选项4',
            value: 4
        }
    ];

    constructor() {
    }


}
