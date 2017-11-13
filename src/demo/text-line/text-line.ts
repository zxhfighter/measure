import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-text-line',
    templateUrl: './text-line.html',
    styleUrls: ['./text-line.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTextLine implements OnInit {

    form: FormGroup;

    disabled = false;
    value = "fadsfaf";

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        
        this.form = this.fb.group({
            textline: [
                {value: 'qazwsx', disabled: false}
            ]
        });
        
    }
}
