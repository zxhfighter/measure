import {Component, ViewEncapsulation} from '@angular/core';
import {BoxGroupValue} from '../../../component/box-group';

@Component({
    selector: 'demo-checkbox-group',
    templateUrl: './checkbox-group.html',
    styleUrls: ['./checkbox-group.less'],
    encapsulation: ViewEncapsulation.None
})
export class DemoCheckboxGroup {
    onCheckboxGroupChange(boxValue: BoxGroupValue) {
        console.log(boxValue);
    }
}
