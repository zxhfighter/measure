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

    tsCodeDynamic: string = require('!!raw-loader!./dynamic/tooltip-dynamic.ts');
    htmlCodeDynamic: string = require('!!raw-loader!./dynamic/tooltip-dynamic.html');
    lessCodeDynamic: string = require('!!raw-loader!./dynamic/tooltip-dynamic.less');

    tsCodeStatic: string = require('!!raw-loader!./static/tooltip-static.ts');
    htmlCodeStatic: string = require('!!raw-loader!./static/tooltip-static.html');
    lessCodeStatic: string = require('!!raw-loader!./static/tooltip-static.less');

    tsCodeShare: string = require('!!raw-loader!./share/tooltip-share.ts');
    htmlCodeShare: string = require('!!raw-loader!./share/tooltip-share.html');
    lessCodeShare: string = require('!!raw-loader!./share/tooltip-share.less');

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

}
