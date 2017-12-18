import { Component, ViewEncapsulation } from '@angular/core';
import { SelectConfig } from "../../../component/select/select.config";

@Component({
    selector: 'demo-select-href',
    templateUrl: './select-href.html',
    styleUrls: ['./select-href.less'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectHrefDemo {
    protected selectedData1: SelectConfig;
    protected selectedData2: SelectConfig;
    protected selectedData3: number = 2;
    protected selectedData4: SelectConfig;
    protected selectedData5: SelectConfig;
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
    protected datasource2: SelectConfig[] = [
        {
            label: '下拉选项1',
            children: [
                {
                    label: '子选项1-1',
                    value: '1-1'
                },
                {
                    label: '子选项1-22222',
                    value: '1-2'
                },
                {
                    label: '子选项1-3',
                    value: '1-3'
                }
            ]
        },
        {
            label: '下拉选项2',
            children: [
                {
                    label: '子选项2-1',
                    value: '2-1'
                },
                {
                    label: '子选项2-2',
                    value: '2-2'
                },
                {
                    label: '子选项2-3',
                    value: '2-3'
                }
            ]
        },
        {
            label: '下拉选项3',
            children: [
                {
                    label: '子选项3-1',
                    value: '3-1'
                },
                {
                    label: '子选项3-2',
                    value: '3-2'
                },
                {
                    label: '子选项3-3',
                    value: '3-3'
                }
            ]
        }
    ];

    constructor() {
    }


}
