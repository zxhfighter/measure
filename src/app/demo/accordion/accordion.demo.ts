import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {panel} from '../../component/accordion/panel';

@Component({
    selector: 'demo-accordion',
    templateUrl: './accordion.demo.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AccordionDemo implements OnInit {

    collapsible: boolean = true;

    hoverable: boolean = true;

    panels: panel[] = [
        {
            header: '1.一级条目',
            content: `
                Mauris mauris ante, blandit et, ultrices a, suscipit eget,
                quam. Integer ut neque. Vivamus nisi metus, molestie vel,
                gravida in, condimentum sit amet, nunc. Nam a nibh. Donec
                suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur
                malesuada. Vestibulum a velit eu ante scelerisque vulputate.
            `
        },
        {
            header: '2.一级条目',
            content: `
                Mauris mauris ante, blandit et, ultrices a, suscipit eget,
                quam. Integer ut neque. Vivamus nisi metus, molestie vel,
                gravida in, condimentum sit amet, nunc. Nam a nibh. Donec
                suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur
                malesuada. Vestibulum a velit eu ante scelerisque vulputate.
            `
        }
    ];

    constructor() {

    }

    ngOnInit() {

    }
}
