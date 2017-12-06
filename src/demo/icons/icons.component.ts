import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.less']
})
export class DemoIconsComponent implements OnInit {
    name = 'ComponentName';

    constructor() {

    }

    ngOnInit() {

    }
}
