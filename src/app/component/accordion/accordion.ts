/**
 * @file accordion component
 * @author wangfengjiao(wangfengjiao01@baidu.com)
 */

import {NgModule, Component, OnInit, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIControl} from '../control';
import {panel} from './panel';
const prefix = UIControl.uiPrefix;

@Component({
    selector: `${prefix}-accordion`,
    template: `
        <div class="${prefix}-accordion">
            <div *ngIf="hoverable; then hoverBlock; else clickBlock"></div>
            <ng-template #clickBlock>
                <div
                    class="${prefix}-accordion-panel"
                    *ngFor="let panel of panels; let index = index"
                    (click)="onClickPanel(index)"
                    [class.${prefix}-accordion-panel-active]="index === activeIndex">
                    <div class="${prefix}-accordion-header">{{panel.header}}</div>
                    <div class="${prefix}-accordion-content">{{panel.content}}</div>
                </div>
            </ng-template>
            <ng-template #hoverBlock>
                <div
                    class="${prefix}-accordion-panel"
                    *ngFor="let panel of panels; let index = index"
                    (mouseover)="onClickPanel(index)"
                    [class.${prefix}-accordion-panel-active]="index === activeIndex">
                    <div class="${prefix}-accordion-header">{{panel.header}}</div>
                    <div class="${prefix}-accordion-content">{{panel.content}}</div>
                </div>
            </ng-template>
        </div>
    `,
    exportAs: 'UIAccordion'
})

export class UIAccordion extends UIControl implements OnInit {
    /**
     * 渲染对象
     *
     * @type {object}
     */
    panels: panel[];

    @Input() set datasource(data: panel[]) {
        this.panels = data;
    }

    get datasource(): panel[] {
        return this.panels;
    }

    /**
     * 激活的panel下标, 如果为-1视为全部折叠
     *
     */
    @Input() activeIndex:number = 0;

    /**
     * 是否hover展开
     *
     */
    @Input() hoverable:boolean = false;

    /**
     * 折叠方式
     * false - 互斥折叠
     * true - 全部可折叠
     *
     */
    @Input() collapsible:boolean = false;

    /**
     * 正常状态三角图标的样式
     * TODO 项目中确定iconfont方案后完善
     *
     */
    headerIcon:string = 'caret-right';

    /**
     * 展开状态三角图标的样式
     *
     */
    activeHeaderIcon:string = 'caret-down';

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

    ngOnInit() {

    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [UIAccordion],
    exports: [UIAccordion]
})
export class UIAccordionModule {
}
