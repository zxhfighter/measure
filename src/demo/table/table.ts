import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import { genStr, genNum } from '../util/random';

@Component({
    selector: 'demo-table',
    templateUrl: './table.html',
    styleUrls: ['./table.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class TableDemo implements OnInit {

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./basic/table-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/table-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/table-basic.less');

    // basic source
    tsCodeCheckbox: string = require('!!raw-loader!./checkbox/table-checkbox.ts');
    htmlCodeCheckbox: string = require('!!raw-loader!./checkbox/table-checkbox.html');
    lessCodeCheckbox: string = require('!!raw-loader!./checkbox/table-checkbox.less');

    // basic source
    tsCodeSort: string = require('!!raw-loader!./sortable/table-sort.ts');
    htmlCodeSort: string = require('!!raw-loader!./sortable/table-sort.html');
    lessCodeSort: string = require('!!raw-loader!./sortable/table-sort.less');

    // basic source
    tsCodeResize: string = require('!!raw-loader!./resize/table-resize.ts');
    htmlCodeResize: string = require('!!raw-loader!./resize/table-resize.html');
    lessCodeResize: string = require('!!raw-loader!./resize/table-resize.less');

    // basic source
    tsCodeFixHead: string = require('!!raw-loader!./fix-head/table-fix-head.ts');
    htmlCodeFixHead: string = require('!!raw-loader!./fix-head/table-fix-head.html');
    lessCodeFixHead: string = require('!!raw-loader!./fix-head/table-fix-head.less');

    // basic source
    tsCodeFixCol: string = require('!!raw-loader!./fix-column/fix-column.ts');
    htmlCodeFixCol: string = require('!!raw-loader!./fix-column/fix-column.html');
    lessCodeFixCol: string = require('!!raw-loader!./fix-column/fix-column.less');

    // basic source
    tsCodeSpan: string = require('!!raw-loader!./colspan/table-colspan.ts');
    htmlCodeSpan: string = require('!!raw-loader!./colspan/table-colspan.html');
    lessCodeSpan: string = require('!!raw-loader!./colspan/table-colspan.less');

    // basic source
    tsCodeEdit: string = require('!!raw-loader!./edit/table-edit.ts');
    htmlCodeEdit: string = require('!!raw-loader!./edit/table-edit.html');
    lessCodeEdit: string = require('!!raw-loader!./edit/table-edit.less');

    isAllChecked = false;

    allDatasource: any[] = [
        { name: '张三', phone: '13566665553', status: 0, statusText: '审核中', school: 'CMU', height: '178cm', checked: false },
        { name: '李四', phone: '15566665554', status: 2, statusText: '审核通过', school: 'XSU', height: '208cm', checked: false },
        { name: '王五', phone: '16566665555', status: 1, statusText: '审核拒绝', school: 'CSU', height: '218cm', checked: false },
        { name: '刘六', phone: '17566665556', status: 2, statusText: '审核通过', school: 'DEU', height: '188cm', checked: false },
        { name: '七七', phone: '17566665557', status: 0, statusText: '审核中', school: 'CSU', height: '178cm', checked: false },
        { name: '巴巴', phone: '18566665558', status: 2, statusText: '审核通过', school: 'DEU', height: '168cm', checked: false },
        { name: '阿九', phone: '11566665559', status: 1, statusText: '审核拒绝', school: 'CBB', height: '158cm', checked: false }
    ];

    datasource: any[];

    filterMap: any = {};

    sortParam: any = {};

    getDatasource() {
        return JSON.parse(JSON.stringify(this.allDatasource));
    }

    constructor() {

    }

    ngOnInit() {
        const statusMap = {
            0: '审核中',
            1: '审核拒绝',
            2: '审核通过'
        }
        const datasource = [];
        for (let i = 0; i < 100; i++) {
            const status = genNum(0, 3);
            datasource.push({
                name: '张三' + i,
                phone: genNum(13000000000, 19000000000),
                status: status,
                statusText: statusMap[status],
                school: ['CMU', 'CSU', 'DEU'][genNum(0, 3)],
                height: genNum(150, 230) + 'cm',
                checked: false
            });
        }
        this.allDatasource = datasource;
        this.datasource = this.getDatasource();
    }

    toggleAllChecked(allChecked: boolean) {
        let data = [...this.datasource];
        data.forEach(v => {
            v.checked = allChecked;
        });
        this.datasource = data;
        this.isAllChecked = allChecked;

    }

    checkIsAllChecked(checked: boolean, item: any) {
        item.checked = checked;
        this.isAllChecked = this.datasource.every(v => v.checked);
    }

    onFilter(value: any, filterParam: any) {
        if (filterParam) {
            this.filterMap[filterParam.field] = value;
            this.filterDatasource(this.filterMap);
        }
    }

    filterDatasource(filterMap: any) {
        let filterData: any = this.getDatasource();

        for (const key in filterMap) {
            if (filterMap.hasOwnProperty(key)) {
                const value = filterMap[key];

                if (key === 'name' && value !== '') {
                    filterData = filterData.filter(v => v.name.indexOf(value) !== -1);
                }

                if (key === 'status' && value.length) {
                    filterData = filterData.filter(v => value.includes(v.status + ''));
                }

                if (key === 'school' && value !== 'ALL') {
                    filterData = filterData.filter(v => v.school.indexOf(value) !== -1);
                }
            }
        }

        if (this.sortParam) {
            filterData = this.sortDatasource(filterData, this.sortParam);
        }


        this.datasource = filterData;
    }

    onSingleFilter(value: any, target: any) {


        if (target.field === 'school') {

            this.filterMap[target.field] = value;
            this.filterDatasource(this.filterMap);

            // this.datasource = this.allDatasource.filter(v => v.school.indexOf(value) !== -1);

            target.filtered = true;
            target.showFilter = false;
        }
    }

    onSort(sortParam: any) {
        this.sortParam = sortParam;
        this.datasource = this.sortDatasource(this.datasource, sortParam);
    }

    sortDatasource(datasource: any, sortParam: any) {
        const order = sortParam.order;
        const orderBy = sortParam.orderBy;

        const stringSort = (a: any, b: any): number => {
            if (a[orderBy] === b[orderBy]) {
                return 0;
            }

            return order === 'desc'
                ? b[orderBy] > a[orderBy] ? 1 : -1
                : b[orderBy] > a[orderBy] ? -1 : 1;
        };

        return datasource.sort(stringSort);
    }
}
