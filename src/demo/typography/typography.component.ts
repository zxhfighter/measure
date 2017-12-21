import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyDemo implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }

    get abc() {
        console.log('abc');
        return 'abc';
    }
}
