import { Component } from '@angular/core';

@Component({
    selector: 'demo-rating',
    templateUrl: './rating.html',
    styleUrls: ['./rating.less']
})
export class RatingDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/rating-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/rating-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/rating-basic.less');

    tsCodeTooltip: string = require('!!raw-loader!./tooltip/rating-tooltip.ts');
    htmlCodeTooltip: string = require('!!raw-loader!./tooltip/rating-tooltip.html');
    lessCodeTooltip: string = require('!!raw-loader!./tooltip/rating-tooltip.less');

    tsCodeForm: string = require('!!raw-loader!./form/rating-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/rating-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/rating-form.less');

    tsCodeTheme: string = require('!!raw-loader!./theme/rating-theme.ts');
    htmlCodeTheme: string = require('!!raw-loader!./theme/rating-theme.html');
    lessCodeTheme: string = require('!!raw-loader!./theme/rating-theme.less');
}
