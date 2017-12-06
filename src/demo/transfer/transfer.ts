import {
    Component, 
    OnInit, 
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-transfer',
    templateUrl: './transfer.html',
    styleUrls: ['./transfer.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTransfer implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
