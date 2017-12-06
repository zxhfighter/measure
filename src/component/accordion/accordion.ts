import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { Panel } from './panel';

@Component({
    selector: 'nb-accordion',
    templateUrl: './accordion.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-accordion'
    },
    exportAs: 'nbAccordion'
})
export class AccordionComponent implements OnInit {

    /**
     * 渲染对象
     *
     * @type {object}
     */
    panels: Panel[];

    @Input() set datasource(data: Panel[]) {
        this.panels = data;
    }

    get datasource(): Panel[] {
        return this.panels;
    }

    /**
     * 激活的panel下标, 如果为-1视为全部折叠
     *
     */
    @Input() activeIndex: number = 0;

    /**
     * 是否hover展开
     *
     */
    @Input() hoverable: boolean = false;

    /**
     * 折叠方式
     * false - 互斥折叠
     * true - 全部可折叠
     *
     */
    @Input() collapsible: boolean = false;

    /**
     * 正常状态三角图标的样式
     * TODO 项目中确定iconfont方案后完善
     *
     */
    headerIcon: string = 'caret-right';

    /**
     * 展开状态三角图标的样式
     *
     */
    activeHeaderIcon: string = 'caret-down';

    constructor() {

    }

    ngOnInit() {

    }

    /**
     * 变更索引
     *
     * @param {number} activeIndex - 指定索引
     */
    changeActiveIndex(activeIndex: number) {
        this.activeIndex = activeIndex;
    }

    /**
     * 激活指定panel
     *
     * @param {number} activeIndex - 指定索引
     */
    onClickPanel(activeIndex: number) {
        // 非互斥折叠
        if (this.collapsible) {
            // 该元素内容已展开，折叠收缩
            if (this.activeIndex === activeIndex) {
                activeIndex = -1;
            }
        }
        // 互斥折叠
        else {
            // 该元素内容已展开，什么都不做
            if (this.activeIndex === activeIndex) {
                return;
            }
        }
        // 激活当前元素
        this.changeActiveIndex(activeIndex);
    }
}


