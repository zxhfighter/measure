import {
    Component, Input, Output, EventEmitter, 
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {BaseItem} from '../../component/common/interface';

@Component({
    selector: 'buttongroup-demo',
    templateUrl: './buttongroup.demo.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ButtongroupDemo implements OnInit {
    data: BaseItem[] = [
        {name: 'apple', value: 1},
        {name: 'balala', value: 2},
        {name: 'orange', value: 3}
    ];

    disabledData: BaseItem[] = [
        {name: 'apple', value: 1},
        {name: 'balala', value: 2, disabled: true},
        {name: 'orange', value: 3}
    ];

    constructor() {

    }

    ngOnInit() {

    }

    onChange1(value) {
        console.log('your selection is: ' + value);
    }
}
