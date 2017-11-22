import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'demo-switch-basic',
    templateUrl: './switch-basic.html',
    styleUrls: ['./switch-basic.less'],
    encapsulation: ViewEncapsulation.None
})
export class DemoSwitchBasic {
    text: string = '';
    checked: boolean = true;

    onSwitchChange(checked: boolean) {
        this.text = checked ? 'checked' : 'unchecked';
    }
}
