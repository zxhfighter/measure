import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-table-checkbox',
    templateUrl: './table-checkbox.html',
    styleUrls: ['./table-checkbox.less'],
    encapsulation: ViewEncapsulation.None
})
export class TableCheckboxDemo {
    isAllChecked = false;

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

    datasource: any[] = [
        { name: '张三', phone: '13566665553', status: 0, statusText: '审核中', school: 'CMU', height: '178cm', checked: false },
        { name: '李四', phone: '15566665554', status: 2, statusText: '审核通过', school: 'XSU', height: '208cm', checked: false },
        { name: '王五', phone: '16566665555', status: 1, statusText: '审核拒绝', school: 'CSU', height: '218cm', checked: false },
        { name: '刘六', phone: '17566665556', status: 2, statusText: '审核通过', school: 'DEU', height: '188cm', checked: false },
        { name: '七七', phone: '17566665557', status: 0, statusText: '审核中', school: 'CSU', height: '178cm', checked: false },
        { name: '巴巴', phone: '18566665558', status: 2, statusText: '审核通过', school: 'DEU', height: '168cm', checked: false },
        { name: '阿九', phone: '11566665559', status: 1, statusText: '审核拒绝', school: 'CBB', height: '158cm', checked: false }
    ];

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

    onRowClick(event: MouseEvent, item: any) {

        const target = event.target as HTMLElement;
        if (target.tagName === 'LABEL' && target.classList.contains('nb-checkbox-label')) {
            return;
        }

        item.checked = !item.checked;
        this.isAllChecked = this.datasource.every(v => v.checked);
    }
}
