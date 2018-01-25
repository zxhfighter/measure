import {
    NgModule,
    Component,
    OnInit,
    ElementRef,
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
        'class': 'nb-widget nb-tab-content',
        '[class.active]': 'active',
    }
})
export class TabComponent implements OnInit {
    @Input() title: string;

    @OnChange(true)
    @Input() disabled: boolean = false;

    @OnChange(true)
    @Input() active: boolean = false;

    @OnChange(true)
    @Input() tipable: boolean = false;

    constructor(public elementRef: ElementRef) {
    }

    ngOnInit () {

    }
}


