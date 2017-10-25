import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'ui-your-component',
    templateUrl: './your-component.html',
    styleUrls: ['./your-component.less'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class YourComponentComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
