import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'demo-table-edit',
    templateUrl: './table-edit.html',
    styleUrls: ['./table-edit.less'],
    encapsulation: ViewEncapsulation.None
})
export class DemoTableEdit {

    fields: any[] = [
        {name: 'name', title: 'Name', editable: true},
        {name: 'address', title: 'Address', editable: true},
        {name: 'age', title: 'Age', align: 'right'},
        {name: 'action', title: 'Action'}
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
        }
    ];

    onToggle(item: any) {
        item.expand = !item.expand;
    }

    onEdit(td: any) {
        td.editing = true;
    }

    onBlur(td: any, filedName: string, item: any, value: any) {
        td.editing = false;
        item[filedName] = value.el.nativeElement.value;
    }

    onEditAddress(item: any) {
        item.editing = true;
    }
}
