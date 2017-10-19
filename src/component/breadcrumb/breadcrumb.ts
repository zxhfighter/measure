import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'ui-breadcrumb',
    templateUrl: './breadcrumb.html',
    styleUrls: ['./breadcrumb.less'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class BreadcrumbComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
