import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-step',
    templateUrl: './step.html',
    styleUrls: ['./step.less'],
    preserveWhitespaces: false
})
export class DemoStep implements OnInit {

    // theme sources
    tsCode: string = require('!!raw-loader!./basic/step-basic.ts');
    htmlCode: string = require('!!raw-loader!./basic/step-basic.html');
    lessCode: string = require('!!raw-loader!./basic/step-basic.less');

    // theme sources
    tsCodeMulti: string = require('!!raw-loader!./multiline/step-multi.ts');
    htmlCodeMulti: string = require('!!raw-loader!./multiline/step-multi.html');
    lessCodeMulti: string = require('!!raw-loader!./multiline/step-multi.less');

    // theme sources
    tsCodeVert: string = require('!!raw-loader!./vertical/step-vertical.ts');
    htmlCodeVert: string = require('!!raw-loader!./vertical/step-vertical.html');
    lessCodeVert: string = require('!!raw-loader!./vertical/step-vertical.less');

    // theme sources
    tsCodeSmall: string = require('!!raw-loader!./small/step-small.ts');
    htmlCodeSmall: string = require('!!raw-loader!./small/step-small.html');
    lessCodeSmall: string = require('!!raw-loader!./small/step-small.less');

    ngOnInit() {

    }
}
