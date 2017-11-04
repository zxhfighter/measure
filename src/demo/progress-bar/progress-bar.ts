import {
    Component, OnInit, ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

@Component({
    selector: 'demo-progress-bar',
    templateUrl: './progress-bar.html',
    styleUrls: ['./progress-bar.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoProgressBar implements OnInit {

    value = 0;
    value1 = 0;

    t: any;
    t1: any;

    isError: boolean;
    isSuccess: boolean;

    constructor() {

    }

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

    ngAfterViewInit() {
    }

    onClose() {
        alert('关闭进度条');
    }

    onRefresh() {
        alert('刷新进度条');
    }
}
