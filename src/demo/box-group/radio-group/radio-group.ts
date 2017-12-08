import { Component, ViewEncapsulation } from '@angular/core';

import { BoxGroupValue } from '../../../component/box-group';

@Component({
    selector: 'demo-radio-group',
    templateUrl: './radio-group.html',
    styleUrls: ['./radio-group.less'],
    encapsulation: ViewEncapsulation.None
})
export class RadioGroupDemo {
    onRadioGroupChange(boxValue: BoxGroupValue) {
        console.log(boxValue);
    }
}
