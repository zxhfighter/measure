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
export class TabComponent implements OnInit {
    @Input() title: string;
    @Input() disabled: string | boolean;
    name: string;

    @OnChange(true)
    @Input() active: boolean = false;

    constructor() { }

    ngOnInit() {
        this.disabled = typeof this.disabled !== 'undefined';
    }

    setActive(): void {
        this.active = true;
    }
}


