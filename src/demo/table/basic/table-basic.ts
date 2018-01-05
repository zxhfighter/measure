import {
    OnInit,
    Component,
    ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';

import { Field } from '../../../component/table';
import { genTableData, getTableDataAsync } from '../table.data';

@Component({
    selector: 'demo-table-basic',
    templateUrl: './table-basic.html',
    styleUrls: ['./table-basic.less']
})
export class TableBasicDemo implements OnInit {

    /**
     * table fields
     */
    fields: Field[] = [
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

    /**
     * table datasource, will change in 3 seconds
     */
    datasource: any[] = genTableData();

    /**
     * table loading state
     */
    loading = false;

    constructor(private _cd: ChangeDetectorRef) {}

    ngOnInit() {

        this.loading = true;

        // generate table data in 3 seconds
        getTableDataAsync(3000).subscribe(data => {

            // update table datasource
            this.datasource = data;
            this.loading = false;

            // trigger change detection
            this._cd.markForCheck();


        });
    }
}
