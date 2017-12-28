import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-page',
    templateUrl: './page.html',
    styleUrls: ['./page.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class PageDemo{

    htmlCodeSize: string = require('!!raw-loader!./size/page-size.html');
}
