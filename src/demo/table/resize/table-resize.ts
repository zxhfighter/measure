import { Component, ViewEncapsulation } from '@angular/core';
import { genTableData } from '../table.data';

@Component({
    selector: 'demo-table-resize',
    templateUrl: './table-resize.html',
    styleUrls: ['./table-resize.less'],
    encapsulation: ViewEncapsulation.None
})
export class TableResizeDemo {

    get abc() {
        console.log('abc');
        return 'abc';
    }

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
        // {
        //     name: 'height',
        //     title: '身高',
        //     sortable: false,
        //     filterable: false,
        //     tipable: false
        // },
        {
            name: 'operation',
            title: '操作',
            sortable: false,
            filterable: false,
            tipable: false
        }
    ];

    datasource: any[] = genTableData();
}
