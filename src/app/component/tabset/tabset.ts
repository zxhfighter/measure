/**
 * @file tabset component
 * @author wangfengjiao(wangfengjiao01@baidu.com)
 */

import {
    Component,
    AfterContentInit,
    QueryList,
    ContentChildren
} from '@angular/core';
import {UITab} from './tab';
import {UIControl} from '../control';
const prefix = UIControl.uiPrefix;

@Component({
    selector: `${prefix}-tabset`,
    templateUrl: './tabset.html',
    styleUrls: ['./tabset.less'],
    exportAs: 'UITabset'
})

export class UITabset implements AfterContentInit {
    @ContentChildren(UITab) tabs: QueryList<UITab>;

    constructor() { }

    ngAfterContentInit(): void {
        this.tabs.toArray()[0].active = true;
    }

    setActive(tab: UITab): void {
        this.tabs.toArray().forEach((t) => t.active = false);
        tab.active = true;
    }
}

