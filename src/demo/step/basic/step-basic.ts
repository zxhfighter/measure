import {Component} from '@angular/core';

@Component({
    selector: 'demo-step-basic',
    templateUrl: './step-basic.html',
    styleUrls: ['./step-basic.less']
})
export class DemoStepBasic {
    currentStep = 1;

    prev() {
        if (this.currentStep === 1) {
            return;
        }

        this.currentStep -= 1;
    }

    next() {
        if (this.currentStep === 3) {
            return;
        }

        this.currentStep += 1;
    }
}
