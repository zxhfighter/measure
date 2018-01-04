import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { genTableData } from '../table.data';
import { Field } from '../../../component/table';

@Component({
    selector: 'demo-table-checkbox',
    templateUrl: './table-checkbox.html',
    styleUrls: ['./table-checkbox.less'],
    encapsulation: ViewEncapsulation.None
})
export class TableCheckboxDemo {

    // whether is all checked
    isAllChecked = false;

    // whether is checked but not all checked
    isIntermediate = false;

    // checked row length
    selectedLength = 0;

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
     * all table datasource
     */
    datasource: any[] = genTableData();

    /**
     * current paged data
     */
    displayTableData: any[] = [];

    /**
     * when paged data is changed, update current display data
     */
    onDisplayDataChange(data: any[]) {
        this.displayTableData = data;
        setTimeout(() => this._freshStatus());
        console.log('1');
    }

    /**
     * check all/uncheck all
     * @param {boolean} allChecked
     */
    toggleAllChecked(allChecked: boolean) {
        this.displayTableData.forEach(v => {
            v.checked = allChecked;
        });

        this._freshStatus();
    }

    /**
     * check whether all rows are checked
     */
    checkIsAllChecked() {
        this._freshStatus();
    }

    /**
     * update status
     */
    _freshStatus() {
        let all = this.displayTableData.every(v => v.checked);
        let some = this.displayTableData.some(v => v.checked);

        this.isAllChecked = all;
        this.isIntermediate = some && !all;
        this.selectedLength = this.displayTableData.filter(v => v.checked).length;
    }

    /**
     * row click event
     */
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
