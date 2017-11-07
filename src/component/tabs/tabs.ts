import {
    Component, Input, ElementRef, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    ContentChildren, QueryList, AfterContentInit
} from '@angular/core';
import { TabComponent } from './tab';

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
export class TabsComponent implements OnInit, AfterContentInit {
    @Input() size: TABS_SIZE = 'default';
    @Input() underline: string | boolean;
    @Input() splitline: string | boolean;

    constructor() {
    }

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    ngOnInit() {
        this.underline = typeof this.underline !== 'undefined';
        this.splitline = typeof this.splitline !== 'undefined';
    }

    ngAfterContentInit(): void {
        /** whether one of tabs is active or not, if not, activate first tab */
        let activeTab = this.tabs.filter(item => item.active === true);
        if (activeTab.length === 0)  {
            this.tabs.toArray()[0].setActive();
        }
    }

    setActive(tab: TabComponent): void {
        if (tab.disabled) {
            return;
        }
        this.tabs.toArray().forEach((t) => t.active = false);
        tab.setActive();
    }
}
