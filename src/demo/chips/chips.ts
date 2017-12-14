import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-chips',
    templateUrl: './chips.html',
    styleUrls: ['./chips.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class ChipsDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/chips-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/chips-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/chips-basic.less');

    tsCodeForm: string = require('!!raw-loader!./form/chips-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/chips-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/chips-form.less');
}
