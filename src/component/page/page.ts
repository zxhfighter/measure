import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import {SelectConfig} from "../select/select.config";

@Component({
    selector: 'nb-page',
    templateUrl: './page.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-page'
    }
})
export class PageComponent implements OnInit {
    // 每页20条
    count = 20;
    // 页数
    pageSize = [1,2,3,4,5,6,7,8,9,10,11];
    // 每页显示条数可选列表
    list = [10, 20, 30, 50, 100];
    // 前4页
    firstPages = [1,2,3,4];
    // 当前页
    currrentIndex = 1;
    lastIndex = 1;

    protected selectedData1: SelectConfig;
    protected selectData: SelectConfig[] = [
        {
            label: '10',
            value: 10
        },
        {
            label: '20',
            value: 20
        },
        {
            label: '30',
            value: 30
        },
        {
            label: '50',
            value: 50
        }
    ];

    constructor() {

    }

    ngOnInit() {

    }
    jumpTo (index: number) {
        if (this.currrentIndex > 0 && this.currrentIndex < this.pageSize.length + 1) {
            if (+index === -2 && this.currrentIndex !== 1) {
                this.currrentIndex--;
            } else if (+index === -1 && this.currrentIndex !== this.pageSize.length) {
                this.currrentIndex++;
            } else if (+index > -1) {
                this.currrentIndex = index;
            }
            this.lastIndex = this.currrentIndex;
        } else {
            this.currrentIndex = this.lastIndex;
        }
        // this.$dispatch('pageChange', this.currrentIndex - 1);
    }
}
