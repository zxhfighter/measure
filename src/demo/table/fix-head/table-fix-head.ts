import { Component, ViewEncapsulation } from '@angular/core';
import { genStr, genNum } from '../../util/random';

@Component({
    selector: 'demo-table-fix-head',
    templateUrl: './table-fix-head.html',
    styleUrls: ['./table-fix-head.less'],
    encapsulation: ViewEncapsulation.None
})
export class TableFixHeadDemo {

    fields: any[] = [
        {
            name: 'name',
            title: '姓名',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'status',
            title: '状态',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'phone',
            title: '手机号',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'school',
            title: '大学',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'height',
            title: '身高',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'operation',
            title: '操作',
            sortable: false,
            filterable: false,
            tipable: false
        }
    ];

    datasource: any[] = [];

    ngOnInit() {
        let data: any[] = [];
        for (let i = 0; i < genNum(100, 200); i++) {
            data.push({
                name: 'name-' + i,
                phone: genNum(13566665553, 18566665558),
                status: genNum(0, 3),
                statusText: '审核中',
                school: 'CSU',
                height: i + 'cm'
            });
        }
        this.datasource = data;
    }
}
