import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-textarea',
    templateUrl: './textarea.html',
    styleUrls: ['./textarea.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTextarea implements OnInit {

    isDisabled = false;

    constructor() {

    }

    ngOnInit() {

    }

    changeDisabled() {
        this.isDisabled = !this.isDisabled;
    }
}
