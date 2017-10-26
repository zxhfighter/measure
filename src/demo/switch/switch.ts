import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-switch',
    templateUrl: './switch.html',
    styleUrls: ['./switch.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoSwitch implements OnInit {

    checked = false;
    disabled = true;

    constructor() {

    }

    ngOnInit() {

    }

    onChange() {
        this.checked = !this.checked;
    }

    onChangeDisabled() {
        this.disabled = !this.disabled;
    }
}
