import {
    Component, Input, ElementRef, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    ContentChildren, QueryList, AfterContentInit
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

    constructor() {
    }

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    ngAfterContentInit(): void {
        /** whether one of tabs is active or not, if not, activate first tab */
        let activeTab = this.tabs.filter(item => item.active === true);
        if (activeTab.length === 0) {
            this.tabs.toArray()[0].active = true;
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
