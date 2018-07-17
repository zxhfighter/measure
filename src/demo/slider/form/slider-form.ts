import { Input, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-slider-form',
    templateUrl: './slider-form.html',
    styleUrls: ['./slider-form.less'],
    encapsulation: ViewEncapsulation.None
})
export class SliderFormDemo implements OnInit {

    form: FormGroup;
    value1: any = 50;
    value2: any = [10, 50];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            slider: [
                { value: this.value2, disabled: false }
            ]
        });
    }
}
