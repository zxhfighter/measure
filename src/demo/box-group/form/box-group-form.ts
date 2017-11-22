import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

import {BoxGroupValue} from '../../../component/box-group';

@Component({
    selector: 'demo-boxgroup-form',
    templateUrl: './box-group-form.html',
    styleUrls: ['./box-group-form.less'],
    encapsulation: ViewEncapsulation.None
})
export class DemoBoxGroupForm implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            radioBox: [
                {value: ['kiwi'], disabled: false}
            ],
            checkboxBox: [
                {value: ['apple', 'grape'], disabled: false}
            ]
        });
    }
}
