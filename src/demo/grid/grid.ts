import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-grid',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './grid.html',
    styleUrls: ['./grid.less']
})
export class GridDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/grid-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/grid-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/grid-basic.less');

    tsCodeGutter: string = require('!!raw-loader!./gutter/grid-gutter.ts');
    htmlCodeGutter: string = require('!!raw-loader!./gutter/grid-gutter.html');
    lessCodeGutter: string = require('!!raw-loader!./gutter/grid-gutter.less');

    tsCodeOffset: string = require('!!raw-loader!./offset/grid-offset.ts');
    htmlCodeOffset: string = require('!!raw-loader!./offset/grid-offset.html');
    lessCodeOffset: string = require('!!raw-loader!./offset/grid-offset.less');

    tsCodeSort: string = require('!!raw-loader!./sort/grid-sort.ts');
    htmlCodeSort: string = require('!!raw-loader!./sort/grid-sort.html');
    lessCodeSort: string = require('!!raw-loader!./sort/grid-sort.less');

    tsCodeFlex: string = require('!!raw-loader!./flex/grid-flex.ts');
    htmlCodeFlex: string = require('!!raw-loader!./flex/grid-flex.html');
    lessCodeFlex: string = require('!!raw-loader!./flex/grid-flex.less');

    tsCodeAlign: string = require('!!raw-loader!./align/grid-align.ts');
    htmlCodeAlign: string = require('!!raw-loader!./align/grid-align.html');
    lessCodeAlign: string = require('!!raw-loader!./align/grid-align.less');

    tsCodeResponsive: string = require('!!raw-loader!./responsive/grid-responsive.ts');
    htmlCodeResponsive: string = require('!!raw-loader!./responsive/grid-responsive.html');
    lessCodeResponsive: string = require('!!raw-loader!./responsive/grid-responsive.less');
}
