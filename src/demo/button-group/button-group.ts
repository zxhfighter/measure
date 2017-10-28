import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-button-group',
    templateUrl: './button-group.html',
    styleUrls: ['./button-group.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoButtonGroup implements OnInit {

    isDisabled = false;

    constructor() {

    }

    ngOnInit() {

    }

    changeDisabled() {
        this.isDisabled = !this.isDisabled;
    }
}
