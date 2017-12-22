import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-page',
    templateUrl: './page.html',
    styleUrls: ['./page.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class PageDemo implements OnInit {

    // pageSize = [1,2,3,4,5,6,7,8,9,10,11];
    // 每页显示多少条
    count = 30;
    // 一共多少条
    total = 302;
    // 可选择的每页显示条数
    list = [10, 20, 30];

    constructor() {

    }

    ngOnInit() {

    }
    pageChange(event) {
        console.log(event);
    }
}
