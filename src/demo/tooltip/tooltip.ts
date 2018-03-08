import { Component } from '@angular/core';

@Component({
    selector: 'demo-tooltip',
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.less']
})
export class TooltipDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/tooltip-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/tooltip-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/tooltip-basic.less');

    tsCodeContent: string = require('!!raw-loader!./content/tooltip-content.ts');
    htmlCodeContent: string = require('!!raw-loader!./content/tooltip-content.html');
    lessCodeContent: string = require('!!raw-loader!./content/tooltip-content.less');

    tsCodeEmbedded: string = require('!!raw-loader!./embedded/tooltip-embedded.ts');
    htmlCodeEmbedded: string = require('!!raw-loader!./embedded/tooltip-embedded.html');
    lessCodeEmbedded: string = require('!!raw-loader!./embedded/tooltip-embedded.less');

    tsCodeInputFocus: string = require('!!raw-loader!./input-focus/tooltip-input-focus.ts');
    htmlCodeInputFocus: string = require('!!raw-loader!./input-focus/tooltip-input-focus.html');
    lessCodeInputFocus: string = require('!!raw-loader!./input-focus/tooltip-input-focus.less');

    tsCodeOthersTrigger: string = require('!!raw-loader!./others-trigger/tooltip-others-trigger.ts');
    htmlCodeOthersTrigger: string = require('!!raw-loader!./others-trigger/tooltip-others-trigger.html');
    lessCodeOthersTrigger: string = require('!!raw-loader!./others-trigger/tooltip-others-trigger.less');

    tsCodeThemes: string = require('!!raw-loader!./themes/tooltip-themes.ts');
    htmlCodeThemes: string = require('!!raw-loader!./themes/tooltip-themes.html');
    lessCodeThemes: string = require('!!raw-loader!./themes/tooltip-themes.less');

    tsCodeStatically: string = require('!!raw-loader!./statically/tooltip-statically.ts');
    htmlCodeStatically: string = require('!!raw-loader!./statically/tooltip-statically.html');
    lessCodeStatically: string = require('!!raw-loader!./statically/tooltip-statically.less');
}
