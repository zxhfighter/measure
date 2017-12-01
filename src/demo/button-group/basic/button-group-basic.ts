import {Component, ViewEncapsulation} from '@angular/core';

import {ButtonGroupValue} from '../../../component/button-group';

@Component({
    selector: 'demo-button-group-basic',
    templateUrl: './button-group-basic.html',
    styleUrls: ['./button-group-basic.less'],
    encapsulation: ViewEncapsulation.None
})
export class DemoButtonGroupBasic {
    text: string = '';
    radioText: string = '';
    checkboxText: string = '';
    checked: boolean = true;

    onSingleToggle(checked: boolean) {
        this.text = checked ? 'checked' : 'unchecked';
    }

    onRadioButtonGroupChanged(event: ButtonGroupValue) {
        this.radioText = `you selected: ${event.currentValue}`;
    }

    onCheckboxButtonGroupChanged(event: ButtonGroupValue) {
        this.checkboxText = `you selected: ${event.value}`;
    }
}
