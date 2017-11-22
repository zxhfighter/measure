import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'demo-progress-bar-basic',
    templateUrl: './progress-bar-basic.html',
    styleUrls: ['./progress-bar-basic.less']
})
export class DemoProgressbarBasic implements OnInit, OnDestroy {
    value = 0;
    value1 = 0;

    t: any;
    t1: any;

    isError: boolean;
    isSuccess: boolean;

    ngOnInit() {
        this.t = setInterval(() => {
            if (this.value <= 100) {
                this.value += 1;
            }

            if (this.value >= 100) {
                this.isSuccess = true;
                clearInterval(this.t);
            }
        }, 100);

        this.t1 = setInterval(() => {

            if (this.value1 <= 100) {
                this.value1 += Math.floor(Math.random() * 10);
            }

            if (this.value1 >= 100) {
                this.isError = true;
                clearInterval(this.t1);
            }
        }, 1000);
    }

    ngOnDestroy() {
        clearInterval(this.t);
        clearInterval(this.t1);
    }
}
