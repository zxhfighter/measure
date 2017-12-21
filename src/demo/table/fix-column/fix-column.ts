import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { genStr, genNum } from '../../util/random';

@Component({
    selector: 'demo-table-fix-column',
    templateUrl: './fix-column.html',
    styleUrls: ['./fix-column.less'],
    encapsulation: ViewEncapsulation.None
})
export class TableFixColumnDemo implements OnInit {

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
            name: 'weight',
            title: '体重',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'age',
            title: '年龄',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'company',
            title: '公司',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'country',
            title: '国家',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'city',
            title: '城市',
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
        for (let i = 0; i < genNum(10, 15); i++) {
            data.push({
                name: 'name-' + i,
                phone: genNum(13566665553, 18566665558),
                status: genNum(0, 3),
                statusText: '审核中',
                school: 'CSU',
                height: i + 'cm',
                weight: i + 'kg',
                age: i + 20,
                company: 'Tesla',
                city: 'NY' + i,
                country: 'China' + i
            });
        }
        this.datasource = data;
    }
}
