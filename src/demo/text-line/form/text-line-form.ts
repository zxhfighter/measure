import {
    Component,
    ViewEncapsulation,
    OnInit
} from '@angular/core';

import {
    FormBuilder,
    FormGroup
} from '@angular/forms';

@Component({
    selector: 'demo-text-line-form',
    templateUrl: './text-line-form.html',
    styleUrls: ['./text-line-form.less'],
    encapsulation: ViewEncapsulation.None
})

export class TextLineFormDemo implements OnInit {

    form: FormGroup;

    disabled = false;
    value = 'fadsfaf';

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {

        this.form = this.fb.group({
            textline: [
                { value: 'qazwsx', disabled: false }
            ]
        });

    }
}
