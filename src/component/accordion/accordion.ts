import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import { Panel } from './panel';
import { collapseAnimation } from '../core/animation/collapse-animations';

@Component({
    selector: 'nb-accordion',
    templateUrl: './accordion.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [ collapseAnimation ],
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-accordion'
    },
    exportAs: 'nbAccordion'
})
export class AccordionComponent {

    /**
     * 数据源
     *
     * @type {object}
     */
    @Input() panels: Panel[];

    /**
     * 激活的panel下标, 如果为-1视为全部折叠
     * @default 0
     */
    @Input() activeIndex: number = 0;

    /**
     * 是否hover展开
     *
     */
    @Input() hoverable: boolean = false;

    /**
     * 折叠方式，互斥折叠 or 全部可折叠
     * @default false 互斥折叠
     *
     */
    @Input() collapsible: boolean = false;

    constructor() {
    }

    /**
     * 变更活动状态的索引
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
    onActivatePanel(activeIndex: number) {
        // 全部可折叠
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


