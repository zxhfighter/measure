import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-uploader',
    templateUrl: './uploader.html',
    styleUrls: ['./uploader.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoUploader implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
