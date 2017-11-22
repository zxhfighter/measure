import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-carousel',
    templateUrl: './carousel.html',
    styleUrls: ['./carousel.less'],
    preserveWhitespaces: false
})
export class DemoCarousel {

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./basic/carousel-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/carousel-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/carousel-basic.less');

    // basic source
    tsCodeAuto: string = require('!!raw-loader!./auto/carousel-auto.ts');
    htmlCodeAuto: string = require('!!raw-loader!./auto/carousel-auto.html');
    lessCodeAuto: string = require('!!raw-loader!./auto/carousel-auto.less');

    // basic source
    tsCodeLarge: string = require('!!raw-loader!./large/carousel-large.ts');
    htmlCodeLarge: string = require('!!raw-loader!./large/carousel-large.html');
    lessCodeLarge: string = require('!!raw-loader!./large/carousel-large.less');

    // basic source
    tsCodeTitle: string = require('!!raw-loader!./title/carousel-title.ts');
    htmlCodeTitle: string = require('!!raw-loader!./title/carousel-title.html');
    lessCodeTitle: string = require('!!raw-loader!./title/carousel-title.less');
}
