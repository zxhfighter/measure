import {
    Component, Input, ElementRef, Output, EventEmitter, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ViewChildren,
    ContentChildren, QueryList, AfterContentInit, AfterViewInit, ChangeDetectorRef
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
export class TabsComponent implements AfterContentInit, AfterViewInit {

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

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    @ViewChild(InkBarComponent) inkBar: InkBarComponent;

    @ViewChildren(TabHeaderComponent) tabHeader: QueryList<TabHeaderComponent>;

    constructor(
        private cdRef: ChangeDetectorRef
    ) {
    }

    ngAfterContentInit(): void {
        // if (this.tabs.length === 0) {
        //     return ;
        // }
        // /** 是否有某个Tab是选中状态，如果没有的话，选中第一个 */
        // let activeTab = this.tabs.filter(item => item.active === true);
        // if (activeTab.length === 0) {
        //     setTimeout(() => {
        //         this.tabs.toArray()[0].active = true;
        //         this.cdRef.markForCheck();

        //         const activeTitle = this.buttons.toArray()[0];
        //         this.inkBar.alignToElement(activeTitle._el.nativeElement);
        //     });
        // }
    }

    ngAfterViewInit(): void {
        if (this.tabs.length === 0) {
            return ;
        }
        /** 是否有某个Tab是选中状态，如果没有的话，选中第一个 */
        let activeTab = this.tabs.filter(item => item.active === true);
        if (activeTab.length === 0) {
            setTimeout(() => {
                this.tabs.toArray()[0].active = true;
                this.cdRef.markForCheck();

                const activeTitle = this.tabHeader.toArray()[0];
                this.inkBar.alignToElement(activeTitle.elementRef.nativeElement);
            });
        }
    }

    /**
     * 设置当前Tab为选中状态
     *
     * @param {TabComponent} tab - 当前Tab
     * @param {number} index - 当前Tab的索引
     */
    setActive(tab: TabComponent, index: number): void {
        if (tab.disabled) {
            return;
        }
        this.tabs.toArray().forEach((t) => t.active = false);
        tab.active = true;

        const activeTitle = this.tabHeader.toArray()[index];
        this.inkBar.alignToElement(activeTitle.elementRef.nativeElement);
    }
}
