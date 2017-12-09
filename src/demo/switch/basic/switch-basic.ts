import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-switch-basic',
    templateUrl: './switch-basic.html',
    styleUrls: ['./switch-basic.less'],
    encapsulation: ViewEncapsulation.None
})
export class SwitchBasicDemo {
    text: string = '';
    checked: boolean = true;
    isDisabled: boolean = false;

    onSwitchChange(checked: boolean) {
        this.text = checked ? 'checked' : 'unchecked';
    }

    onChange() {
        this.checked = !this.checked;
    }

    onChangeDisable() {
        this.isDisabled = !this.isDisabled;
    }
}
