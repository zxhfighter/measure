import {
    NgModule,
    Component,
    OnInit,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    ContentChild
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { TabTitleDirective } from './tab-title.directive';

@Component({
    selector: 'nb-tab',
    templateUrl: './tab.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nbTab',
    host: {
        'class': 'nb-widget nb-tab-content',
        '[class.active]': 'active',
    }
})
export class TabComponent {

    @ContentChild(TabTitleDirective) templateTitle: TabTitleDirective;

    @Input() title: string;

    @OnChange(true)
    @Input() disabled: boolean = false;

    @OnChange(true)
    @Input() active: boolean = false;

    @OnChange(true)
    @Input() tipable: boolean = false;

    constructor(public elementRef: ElementRef) {
    }
}


