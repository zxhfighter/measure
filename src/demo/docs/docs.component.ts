import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-guide',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.less']
})
export class DemoGuideComponent implements OnInit {
    name = 'ComponentName';

    constructor() {

    }

    ngOnInit() {

    }
}
