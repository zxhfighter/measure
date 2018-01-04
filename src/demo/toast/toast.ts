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

    tsCode: string = require('!!raw-loader!./base/toast-base.ts');
    htmlCode: string = require('!!raw-loader!./base/toast-base.html');
    lessCode: string = require('!!raw-loader!./base/toast-base.less');

    constructor() {
    }
}
