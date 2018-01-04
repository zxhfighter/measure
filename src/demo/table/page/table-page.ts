import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { genTableData } from '../table.data';

@Component({
    selector: 'demo-table-page',
    templateUrl: './table-page.html',
    styleUrls: ['./table-page.less'],
    encapsulation: ViewEncapsulation.None
})
export class TablePageDemo {
    pageSize = 20;
    page = 1;

    constructor() {}

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

    datasource: any[] = genTableData();

    pageChange(pageEvent: any) {
        if (pageEvent.count) {
            this.pageSize = pageEvent.count;
        }

        if (pageEvent.currrentIndex) {
            this.page = pageEvent.currrentIndex;
        }
    }
}
