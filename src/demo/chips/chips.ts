import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-chips',
    templateUrl: './chips.html',
    styleUrls: ['./chips.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoChips implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
