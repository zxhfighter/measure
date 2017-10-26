import {
    Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {BreadcrumbItem} from '../../component/breadcrumb';

@Component({
    selector: 'demo-breadcrumb',
    templateUrl: './breadcrumb.html',
    styleUrls: ['./breadcrumb.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoBreadcrumb implements OnInit {
    name = 'ComponentName';

    data1: BreadcrumbItem[] = [
        {text: 'One', href: 'http://www.huxiu.com'},
        {text: 'Two', href: 'http://www.baidu.com'},
        {text: 'Three'}
    ];

    data2: BreadcrumbItem[] = [
        {text: 'One', path: '/button'},
        {text: 'Two', path: '/breadcrumb'},
        {text: 'Three'}
    ];

    data3: BreadcrumbItem[] = [
        {text: 'One'}
    ];

    data4: BreadcrumbItem[] = [
        {text: 'One'},
        {text: 'Two'},
        {text: 'Three'}
    ];

    constructor() {

    }

    ngOnInit() {

    }
}
