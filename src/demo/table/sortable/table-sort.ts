import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'demo-table-sort',
    templateUrl: './table-sort.html',
    styleUrls: ['./table-sort.less'],
    encapsulation: ViewEncapsulation.None
})
export class DemoTableSort {

    filterMap: any = {};

    sortParam: any = {};

    allDatasource: any[] = [
        {name: '张三', phone: '13566665553', status: 0, statusText: '审核中', school: 'CMU', height: '178cm', checked: false},
        {name: '李四', phone: '15566665554', status: 2, statusText: '审核通过', school: 'XSU', height: '208cm', checked: false},
        {name: '王五', phone: '16566665555', status: 1, statusText: '审核拒绝', school: 'CSU', height: '218cm', checked: false},
        {name: '刘六', phone: '17566665556', status: 2, statusText: '审核通过', school: 'DEU', height: '188cm', checked: false},
        {name: '七七', phone: '17566665557', status: 0, statusText: '审核中', school: 'CSU', height: '178cm', checked: false},
        {name: '巴巴', phone: '18566665558', status: 2, statusText: '审核通过', school: 'DEU', height: '168cm', checked: false},
        {name: '阿九', phone: '11566665559', status: 1, statusText: '审核拒绝', school: 'CBB', height: '158cm', checked: false}
    ];

    datasource: any[] = [];

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

    onFilter(value: any, filterParam: any) {


        if (filterParam) {
            const target = filterParam.target;

            this.filterMap[target.field] = value;
            this.filterDatasource(this.filterMap);

            switch (target.field) {
                case 'status':
                    if (!value.length) {
                        target.filtered = false;
                    }
                    break;
                case 'name':
                    if (!value.length) {
                        target.filtered = false;
                    }
                    break;
                default: break;
            }
        }
    }

    getDatasource() {
        return JSON.parse(JSON.stringify(this.allDatasource));
    }

    ngOnInit() {
        this.datasource = this.getDatasource();
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

    onSingleFilter(value: string, target: any) {


        if (target.field === 'school') {

            this.filterMap[target.field] = value;
            this.filterDatasource(this.filterMap);

            target.filtered = true;
            target.showFilter = false;

            if (value.toLowerCase() === 'all') {
                target.filtered = false;
            }
        }
    }
}
