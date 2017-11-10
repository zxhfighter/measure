import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-text-line',
    templateUrl: './text-line.html',
    styleUrls: ['./text-line.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTextLine implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
