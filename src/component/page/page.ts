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
    // count = 20;
    /**
     * count per page
     * @default default
     */
    @Input() count: number = 20;
    
    /**
     * total count
     * @default default
     */
    @Input() total: number;

    // 可选择的每页显示条数,
    // 可选填参数

    /**
     * page list selected
     * @default default
     */
    @Input('value') list: Array<T>;

    /**
     * when page change, emit a change event, which contains the currrentIndex and the count
     * @default default
     */
    @Output() pageChange: EventEmitter<Object> = new EventEmitter();
    
    /**
     * 页数
     * @docs-private
     */
    pageSize = [];
    // pageSize = [1,2,3,4,5,6,7,8,9,10,11];
    // 每页显示条数可选列表
    
    /**
     * 前4页
     * @docs-private
     */
    firstPages = [1,2,3,4];
    /**
     * 当前页
     * @docs-private
     */
    currrentIndex = 1;
    /**
     * 最后选择的页
     * @docs-private
     */
    lastIndex = 1;

    // selectedData1: SelectConfig;
    /**
     * 可供选择的每页显示的条数
     * @docs-private
     */
    selectData: SelectConfig[] = [
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
        if (this.list && this.list.length > 0) {
            this.selectData = [];
            for(let i = 0; i < this.list.length; i++) {
                this.selectData.push({
                    label: this.list[i],
                    value: this.list[i]
                });
            }
        }
        
        this.setPage();
    }

    /**
     * set current page
     *
     * @param {any} value - box value
     * @docs-private
     */
    setPage() {
        this.pageSize = [];
        let pageCount = Math.ceil(this.total / this.count);
        for (let i = 1; i <= pageCount; i++) {
            this.pageSize.push(i);
        }
    }

    /**
     * jump tp page num
     *
     * @param {number} index - page num
     * @docs-private
     */
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
        this.pageChange.emit({
            currrentIndex: this.currrentIndex,
            count: this.count});
        // this.$dispatch('pageChange', this.currrentIndex - 1);
    }

    /**
     * set current page count
     *
     * @param {object} event - page change event
     * @docs-private
     */
    setCount(event) {
        this.count = event.value;
        this.currrentIndex = 1;
        this.pageChange.emit({
            currrentIndex: this.currrentIndex,
            count: this.count});
        this.setPage();
    }
}
