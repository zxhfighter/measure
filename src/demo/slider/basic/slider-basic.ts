import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'demo-slider-basic',
    templateUrl: './slider-basic.html',
    styleUrls: ['./slider-basic.less'],
    encapsulation: ViewEncapsulation.None
})
export class SliderBasicDemo implements OnInit {

    value1: number = 50;
    value2: number[] = [100, 150];
    horizontal: string = 'horizontal';
    vertical: string = 'vertical';
    valueDefault: number;
    valueInput: number;
    valueStep: number;
    valueRange0: number = 0;
    valueRange1: number = 0;
    valueVertical: number;
    valueVerticalRange0: number = 0;
    valueVerticalRange1: number = 0;
    constructor() { }

    ngOnInit() {
        this.valueRange0 = this.value2[0];
        this.valueRange1 = this.value2[1];
        this.valueVertical = 20;
    }

    onDefaultChange(e) {
        this.valueDefault = e;
    }

    onInputChange(e) {
        /**
         * 作为input控件本身在输入框值变化时会触发
         */
        if (!isNaN(e)) {
            this.valueInput = e;
        }
    }

    onStepChange(e) {
        this.valueStep = e;
    }

    onRangeChange(e) {
        this.valueRange0 = e[0];
        this.valueRange1 = e[1];
    }

    onVerticalChange(e) {
        this.valueVertical = e;
    }

    onVerticalRangeChange(e) {
        this.valueVerticalRange0 = e[0];
        this.valueVerticalRange1 = e[1];
    }
}
