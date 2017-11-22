import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'demo-switch-form',
    templateUrl: './switch-form.html',
    styleUrls: ['./switch-form.less'],
    encapsulation: ViewEncapsulation.None
})
export class DemoSwitchForm implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            switch2: [
                {value: true, disabled: false}
            ]
        });
    }
}
