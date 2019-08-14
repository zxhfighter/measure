import {
    Component, Input, ElementRef, Output, EventEmitter, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ViewChildren, AfterViewChecked,
    ContentChildren, QueryList, AfterContentInit, AfterViewInit, ChangeDetectorRef, AfterContentChecked
} from '@angular/core';
import { TabComponent } from './tab';
import { InkBarComponent } from './ink-bar';
import { TabHeaderComponent } from './tab-header';
import { OnChange } from '../core/decorators';

/** default tab size types */
export type TABS_SIZE = 'default' | 'large' | string;

@Component({
    selector: 'nb-tabs',
    templateUrl: './tabs.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget'
    },
    exportAs: 'nbTabs'
})
export class TabsComponent implements OnInit, AfterViewInit, AfterViewChecked {

    /**
     * Tabs尺寸, 'default' | 'large'
     * @default default
     */
    @Input() size: TABS_SIZE = 'default';

    /**
     * Tabs是否有下划线, true | false
     * @default false
     */
    @OnChange(true)
    @Input() underline: boolean = false;

    /**
     * 各Tab间是否有分割线, true | false
     * @default false
     */
    @OnChange(true)
    @Input() splitline: boolean = false;

    /**
     *  panel 活动状态发生改变时事件 emit
     *
     */
    @Output() change: EventEmitter<object> = new EventEmitter<object>();

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    @ViewChild(InkBarComponent, {static: false}) inkBar: InkBarComponent;

    @ViewChildren(TabHeaderComponent) tabHeader: QueryList<TabHeaderComponent>;

    activeIndex: number;

    initializeActiveIndexChange: boolean;

    constructor(
        private cdRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        if (this.tabs.length === 0) {
            return ;
        }
        /** 是否有某个Tab是选中状态，如果没有的话，选中第一个 */
        let activeIndex = this.tabs.toArray().findIndex(item => item.active === true);
        this.activeIndex = activeIndex === -1 ? 0 : activeIndex;
        setTimeout(() => {
            this.tabs.toArray()[this.activeIndex].active = true;
        });
        this.initializeActiveIndexChange = true;
    }

    ngAfterViewChecked(): void {
        if (this.initializeActiveIndexChange) {
            this.alignInkBar();
        }
    }

    /**
     * 设置当前Tab为选中状态
     *
     * @param {number} index - 当前Tab的索引
     */
    setActive(index: number): void {
        const tab  = this.tabs.toArray()[index];
        if (tab.disabled) {
            return;
        }
        if (tab.active) {
            return;
        }
        this.activeIndex = index;
        this.initializeActiveIndexChange = false;
        this.tabs.toArray().forEach((t) => t.active = false);
        tab.active = true;

        this.alignInkBar();

        this.change.emit({
            activeIndex: index
        });
    }

    /**
     * 设置选中线的位置
     *
     */
    alignInkBar(): void {
        const activeTitle = this.tabHeader.toArray()[this.activeIndex];
        if (activeTitle) {
            this.inkBar.alignToElement(activeTitle.elementRef.nativeElement);
        }
    }
}
