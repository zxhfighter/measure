import {
    Component, Input, ElementRef, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    ContentChildren, QueryList, AfterContentInit, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import { TabComponent } from './tab';
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
    }
})
export class TabsComponent implements AfterContentInit {
    @Input() size: TABS_SIZE = 'default';

    @OnChange(true)
    @Input() underline: boolean = true;

    @OnChange(true)
    @Input() splitline: boolean = false;

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    constructor(
        private cdRef: ChangeDetectorRef
    ) {
    }

    ngAfterContentInit(): void {
        if (this.tabs.length === 0) {
            return ;
        }
        /** whether one of tabs is active or not, if not, activate first tab */
        let activeTab = this.tabs.filter(item => item.active === true);
        if (activeTab.length === 0) {
            setTimeout(() => {
                this.tabs.toArray()[0].active = true;
                this.cdRef.markForCheck();
            });
        }
    }

    setActive(tab: TabComponent): void {
        if (tab.disabled) {
            return;
        }
        this.tabs.toArray().forEach((t) => t.active = false);
        tab.active = true;
    }
}
