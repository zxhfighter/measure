import {Component, ChangeDetectionStrategy} from '@angular/core';
import {SelectConfig} from "../../component/select/select.config";

@Component({
    selector: 'demo-select',
    templateUrl: './select.html',
    styleUrls: ['./select.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoSelect {
    protected selectedData1: SelectConfig;
    protected selectedData2: SelectConfig;
    protected selectedData3: number = 2;
    protected selectData: SelectConfig[] = [
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
