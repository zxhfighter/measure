import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-breadcrumb',
    templateUrl: './breadcrumb.html',
    styleUrls: ['./breadcrumb.less'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoBreadcrumb implements OnInit {
    name = 'ComponentName';

    constructor() {

    }

    ngOnInit() {

    }
}
