import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { genTableData } from '../table.data';

@Component({
    selector: 'demo-table-sort',
    templateUrl: './table-sort.html',
    styleUrls: ['./table-sort.less'],
    encapsulation: ViewEncapsulation.None
})
export class TableSortDemo implements OnInit {

    filterMap: any = {};

    sortParam: any = {};

    datasource: any[] = genTableData();

    displayTableData: any[] = [];

    pageSize = 5;

    onDisplayDataChange(data: any[]) {
        this.displayTableData = data;
    }

    onSort(sortParam: any) {
        // this.sortParam = sortParam;
        // this.displayTableData = this.sortDatasource(this.datasource, sortParam);
        console.log('sorting...: ', sortParam);
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

    ngOnInit() {

    }

    filterDatasource(filterMap: any) {
        let filterData: any = this.datasource;

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

        this.displayTableData = filterData.slice(0, this.pageSize);
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
