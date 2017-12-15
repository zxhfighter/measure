import { Component, ViewEncapsulation } from '@angular/core';
import { BoxGroupValue } from '../../../component/box-group';

@Component({
    selector: 'demo-checkbox-group',
    templateUrl: './checkbox-group.html',
    styleUrls: ['./checkbox-group.less'],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxGroupDemo {

    datasource: any[] = [
        {value: 'apple', text: 'apple', checked: false, disabled: false},
        {value: 'banana', text: 'banana', checked: false, disabled: false},
        {value: 'lemon', text: 'lemon', checked: false, disabled: false},
        {value: 'orange', text: 'orange', checked: false, disabled: false}
    ];

    onCheckboxGroupChange(boxValue: BoxGroupValue) {
        console.log(boxValue);
    }
}
