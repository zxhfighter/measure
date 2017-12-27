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
    selector: 'nb-tab-header',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nbTabHeader',
    host: {
        'class': 'nb-widget nb-tab-header'
    }
})
export class TabHeaderComponent {

    constructor(public elementRef: ElementRef) {
    }
}


