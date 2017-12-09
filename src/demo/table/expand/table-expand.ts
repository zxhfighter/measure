import { Component, ViewEncapsulation } from '@angular/core';
import { genStr, genNum } from '../../util/random';

@Component({
    selector: 'demo-table-expand',
    templateUrl: './table-expand.html',
    styleUrls: ['./table-expand.less'],
    encapsulation: ViewEncapsulation.None
})
export class TableExpandDemo {

    fields: any[] = [
        { name: 'name', title: 'Name' },
        { name: 'age', title: 'Age' },
        { name: 'address', title: 'Address' },
        { name: 'action', title: 'Action' }
    ];

    datasource: any[] = [
        {
            name: 'John Brown',
            age: 32,
            expand: false,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
        },
        {
            name: 'Jim Green',
            age: 42,
            expand: false,
            address: 'London No. 1 Lake Park',
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
        },
        {
            name: 'Joe Black',
            age: 32,
            expand: false,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
        },
    ];

    onToggle(item: any) {
        item.expand = !item.expand;
    }
}
