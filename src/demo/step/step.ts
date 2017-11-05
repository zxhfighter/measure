import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-step',
    templateUrl: './step.html',
    styleUrls: ['./step.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoStep implements OnInit {

    currentStep = 1;

    constructor() {

    }

    ngOnInit() {

    }

    prev() {
        if (this.currentStep === 1) {
            return;
        }

        this.currentStep -= 1;
        console.log(this.currentStep);
    }

    next() {
        if (this.currentStep === 3) {
            return;
        }

        this.currentStep += 1;
        console.log(this.currentStep);

    }
}
