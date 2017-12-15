import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.less'],
})
export class TypographyDemo implements OnInit {
    name = 'ComponentName';

    constructor() {

    }

    ngOnInit() {

    }
}
