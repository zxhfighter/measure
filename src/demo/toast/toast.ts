import {
    Component, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-toast',
    templateUrl: './toast.html',
    styleUrls: ['./toast.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class ToastDemo {

    tsCode: string = require('!!raw-loader!./href/toast-href.ts');
    htmlCode: string = require('!!raw-loader!./href/toast-href.html');
    lessCode: string = require('!!raw-loader!./href/toast-href.less');

    constructor() {
    }
}
