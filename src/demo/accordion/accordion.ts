import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';
import { Panel } from '../../component/accordion/panel';

@Component({
    selector: 'demo-accordion',
    templateUrl: './accordion.html',
    styleUrls: ['./accordion.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoAccordion implements OnInit {

    collapsible: boolean = true;

    hoverable: boolean = true;

    panels: Panel[] = [
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
