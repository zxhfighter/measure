import {
    Component, Input, Output, EventEmitter, 
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-checkbox',
    templateUrl: './checkbox.demo.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CheckboxDemo implements OnInit {
    name = 'ComponentName';

    checkObj = {
        apple: true, 
        balala: false
    };

    constructor() {

    }

    ngOnInit() {

    }

    onChange(checked: boolean) {
        console.log(checked);
    }
}
