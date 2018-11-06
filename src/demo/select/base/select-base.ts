import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { SelectConfig } from '../../../component/select';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'demo-select-base',
    templateUrl: './select-base.html',
    styleUrls: ['./select-base.less'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectBaseDemo implements AfterViewInit {
    formGroup: FormGroup;
    selectedData1: SelectConfig;
    selectedData2: SelectConfig;
    selectedData3: any = 2;
    selectedData4: SelectConfig;
    selectedData5: SelectConfig;
    datasource: SelectConfig[] = [
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
    datasource2: SelectConfig[] = [
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

    crowds = [
        { label: '人群1', value: 1 },
        { label: '人群2', value: 2 },
        { label: '人群3', value: 3 }
    ];

    constructor(
        private fb: FormBuilder
    ) {
        this.formGroup = this.fb.group({
            crowd: [null]
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.formGroup.get('crowd').setValue(3);
        }, 2000);
    }

    clear(ui) {
        this.selectedData3 = null;
        ui.clear();
    }
}
