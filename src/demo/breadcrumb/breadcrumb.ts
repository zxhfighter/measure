import { Component } from '@angular/core';

@Component({
    selector: 'demo-breadcrumb',
    templateUrl: './breadcrumb.html',
    styleUrls: ['./breadcrumb.less']
})
export class BreadcrumbDemo {
    // theme sources
    tsCode: string = require('!!raw-loader!./href/breadcrumb-href.ts');
    htmlCode: string = require('!!raw-loader!./href/breadcrumb-href.html');
    lessCode: string = require('!!raw-loader!./href/breadcrumb-href.less');
}
