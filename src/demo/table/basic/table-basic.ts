import {Component} from '@angular/core';

@Component({
    selector: 'demo-table-basic',
    templateUrl: './table-basic.html',
    styleUrls: ['./table-basic.less']
})
export class DemoTableBasic {
    datasource: any[] = [
        {name: '张三', phone: '13566665553', status: 0, statusText: '审核中', school: 'CMU', height: '178cm', checked: false},
        {name: '李四', phone: '15566665554', status: 2, statusText: '审核通过', school: 'XSU', height: '208cm', checked: false},
        {name: '王五', phone: '16566665555', status: 1, statusText: '审核拒绝', school: 'CSU', height: '218cm', checked: false},
        {name: '刘六', phone: '17566665556', status: 2, statusText: '审核通过', school: 'DEU', height: '188cm', checked: false},
        {name: '七七', phone: '17566665557', status: 0, statusText: '审核中', school: 'CSU', height: '178cm', checked: false},
        {name: '巴巴', phone: '18566665558', status: 2, statusText: '审核通过', school: 'DEU', height: '168cm', checked: false},
        {name: '阿九', phone: '11566665559', status: 1, statusText: '审核拒绝', school: 'CBB', height: '158cm', checked: false}
    ];
}
