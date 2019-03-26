import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-page-size',
    templateUrl: './page-size.html',
    styleUrls: ['./page-size.less'],
    // encapsulation: ViewEncapsulation.None
})
export class PageSizeDemo {
    // pageSize = [1,2,3,4,5,6,7,8,9,10,11];
    // 每页显示多少条
    // count1: number;
    // count2: number;
    // count3: number;

    // curIndex1: number;
    // curIndex2: number;
    // curIndex3: number;

    // 一共多少条
    total = 302;
    // 可选择的每页显示条数
    list = [10, 20, 30];

    curIndex1 = 1;
    curIndex2 = 2;
    curIndex3 = 3;
    curIndex4 = 4;

    count1 = 10;
    count2 = 20;
    count3 = 30;
    count4 = 20;

    constructor() {
        setTimeout(() => {
            this.curIndex1 = 2;
            // this.curIndex2 = 2;
            // this.curIndex3 = 3;

            this.count1 = 20;
            // this.count2 = 20;
            // this.count3 = 30;
        }, 1000);
    }

    pageChange(event) {
        console.log(event);
    }
    // test() {
    //     this.total = 50;
    //     this.count = 10;
    //     console.log(this.count);
    // }
}
