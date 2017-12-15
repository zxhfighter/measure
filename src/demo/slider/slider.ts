import {
    Component, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-slider',
    templateUrl: './slider.html',
    styleUrls: ['./slider.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class SliderComponentDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/slider-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/slider-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/slider-basic.less');

    tsCodeForm: string = require('!!raw-loader!./form/slider-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/slider-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/slider-form.less');
}
