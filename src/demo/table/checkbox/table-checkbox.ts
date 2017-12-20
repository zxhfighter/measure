import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { genTableData } from '../table.data';

@Component({
    selector: 'demo-table-checkbox',
    templateUrl: './table-checkbox.html',
    styleUrls: ['./table-checkbox.less'],
    encapsulation: ViewEncapsulation.None
})
export class TableCheckboxDemo {
    isAllChecked = false;
    isIntermediate = false;
    displayTableData: any[] = [];
    selectedLength = 0;

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

    onDisplayDataChange(data: any[]) {
        this.displayTableData = data;
        setTimeout(() => this._freshStatus());
    }

    toggleAllChecked(allChecked: boolean) {
        this.displayTableData.forEach(v => {
            v.checked = allChecked;
        });

        this._freshStatus();
    }

    checkIsAllChecked(checked: boolean) {
        this._freshStatus();
    }

    _freshStatus() {
        let all = this.displayTableData.every(v => v.checked);
        let some = this.displayTableData.some(v => v.checked);

        this.isAllChecked = all;
        this.isIntermediate = some && !all;
        this.selectedLength = this.displayTableData.filter(v => v.checked).length;
    }

    onRowClick(event: MouseEvent, item: any) {

        const target = event.target as HTMLElement;

        // filter click
        if (
            target.tagName === 'LABEL' && target.classList.contains('nb-checkbox-label')
            || (target.parentNode as any).classList.contains('nb-checkbox-label')
            || target.tagName === 'A'
        ) {
            return;
        }

        item.checked = !item.checked;
        this._freshStatus();
    }
}
