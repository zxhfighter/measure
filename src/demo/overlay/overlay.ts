import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-overlay',
    templateUrl: './overlay.html',
    styleUrls: ['./overlay.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoOverlay implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
