import { Component } from '@angular/core';

import { BreadcrumbItem } from '../../../component/breadcrumb';

@Component({
    selector: 'demo-breadcrumb-href',
    templateUrl: './breadcrumb-href.html',
    styleUrls: ['./breadcrumb-href.less']
})
export class BreadcrumbHrefDemo {
    data1: BreadcrumbItem[] = [
        { text: 'One', href: 'http://www.huxiu.com' },
        { text: 'Two', href: 'http://www.baidu.com' },
        { text: 'Three' }
    ];

    data2: BreadcrumbItem[] = [
        { text: 'One', path: '/components/button', queryParams: { userId: 10 } },
        { text: 'Two', path: '/components/breadcrumb' },
        { text: 'Three' }
    ];

    data3: BreadcrumbItem[] = [
        { text: 'One' }
    ];

    data4: BreadcrumbItem[] = [
        { text: 'One' },
        { text: 'Two' },
        { text: 'Three' }
    ];

    commonQueryParams = {
        userId: 22
    };
}
