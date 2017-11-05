import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'demo-spinner',
    templateUrl: './spinner.html',
    styleUrls: ['./spinner.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoSpinner implements OnInit {

    form: FormGroup;


    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.fb.group({
            spinner: [
                {value: 11, disabled: false}
            ]
        });
    }
}
