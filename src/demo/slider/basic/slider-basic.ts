import { Input, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-slider-basic',
    templateUrl: './slider-basic.html',
    encapsulation: ViewEncapsulation.None
})
export class SliderBasicDemo implements OnInit {

    value1: number = 0;
    value2: Array<number>;
    horizontal: string = 'horizontal';
    vertical: string = 'vertical';

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.value1 = 50;
        this.value2 = [150, 160];
    }
}
