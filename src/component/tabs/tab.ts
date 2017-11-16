import {
    NgModule,
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import { OnChange } from '../core/decorators';

@Component({
    selector: 'nb-tab',
    templateUrl: './tab.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nbTab',
    host: {
        'class': 'nb-widget nb-tab',
        '[class.active]': 'active',
    }
})
export class TabComponent {
    @Input() title: string;

    @OnChange(true)
    @Input() disabled: boolean = false;

    @OnChange(true)
    @Input() active: boolean = false;

    @OnChange(true)
    @Input() tipable: boolean = false;

    constructor() {
    }
}


