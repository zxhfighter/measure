import {
    Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {InputConfig} from '../../component/input';

export function getInputConfig(): InputConfig {
    return Object.assign(new InputConfig, { theme: 'default' });
}

@Component({
    selector: 'demo-input',
    templateUrl: './input.html',
    styleUrls: ['./input.less'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [{provide: InputConfig, useFactory: getInputConfig}]
})
export class DemoInput implements OnInit {

    name = 'ComponentName';
    isDisabled = false;

    size = 'short-low';

    constructor() {

    }

    ngOnInit() {

    }

    /**
     * 控制input是否disabled
     */
    changeDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    /**
     * 改变input尺寸
     */
    changeSize() {
        let arrSize = ['long-high', 'long-middle', 'long-low', 'default', 'short-high', 'short-middle', 'short-low'];
        this.size = arrSize[Math.floor(Math.random() * 7)];
    }

    onFocus(ipt) {
        ipt.placeholder = '';
    }
}
