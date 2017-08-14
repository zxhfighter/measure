import {
    Component, Input, Output, AfterViewInit,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {UIButton} from '../../component/button/button';

@Component({
    selector: 'button-demo',
    templateUrl: './button.demo.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ButtonDemo implements OnInit, AfterViewInit {
    name = 'ComponentName';
    clicks = 0;

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    onClick() {
        this.clicks++;
    }
}
