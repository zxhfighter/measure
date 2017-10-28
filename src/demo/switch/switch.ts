import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'demo-switch',
    templateUrl: './switch.html',
    styleUrls: ['./switch.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoSwitch implements OnInit {

    checked = true;
    disabled = true;

    form: FormGroup;

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.fb.group({
            isChecked: [
                {value: true, disabled: false}
            ]
        });
    }

    onChange() {
        this.checked = !this.checked;
    }

    onChangeDisabled() {
        this.disabled = !this.disabled;
    }
}
