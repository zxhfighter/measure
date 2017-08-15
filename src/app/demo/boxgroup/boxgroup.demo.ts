import {
    Component, Input, Output, EventEmitter, 
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {BaseItem} from '../../component/common/interface';

@Component({
    selector: 'demo-boxgroup',
    templateUrl: './boxgroup.demo.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class BoxGroupDemo implements OnInit {
    name = 'ComponentName';

    data: BaseItem[] = [
        {
            name: 'apple',
            value: 1
        },
        {
            name: 'balala',
            value: 2
        },
        {
            name: 'orange',
            value: 3
        }
    ];

    constructor() {

    }

    ngOnInit() {

    }
}
