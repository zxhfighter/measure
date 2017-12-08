import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';
// import { UploaderComponent } from '../../component/uploader';

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

    onBasicUpload() {
        alert('上传成功');
    }
}
