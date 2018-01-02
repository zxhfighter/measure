import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';

import { genTableData, getTableDataAsync } from '../table.data';

@Component({
    selector: 'demo-table-basic',
    templateUrl: './table-basic.html',
    styleUrls: ['./table-basic.less']
})
export class TableBasicDemo implements OnInit {

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

    constructor(private _cd: ChangeDetectorRef) {}

    ngOnInit() {
        const self = this;
        getTableDataAsync().subscribe(data => {
            self.datasource = [];
            self.datasource = data;
            console.log(data);
            this._cd.markForCheck();
        });
    }
}
