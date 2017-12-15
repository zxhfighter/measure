import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-region',
    templateUrl: './region.html',
    styleUrls: ['./region.less'],
    preserveWhitespaces: false
})
export class RegionDemo {

    // theme sources
    tsCode: string = require('!!raw-loader!./basic/region-basic.ts');
    htmlCode: string = require('!!raw-loader!./basic/region-basic.html');
    lessCode: string = require('!!raw-loader!./basic/region-basic.less');

    // theme sources
    tsCodeForm: string = require('!!raw-loader!./form/region-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/region-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/region-form.less');
}
