import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-page',
    templateUrl: './page.html',
    styleUrls: ['./page.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoPage implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
