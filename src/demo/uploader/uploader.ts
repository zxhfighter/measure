import {
    Input, Component, OnInit, ChangeDetectionStrategy
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

    uploadedFiles: any[] = [
        {
            url: 'https://www.baidu.com/img/bd_logo1.png',
            name: 'bd_logo1.png',
            size: 7877,
            type: 'image/jpeg'
        },
        {
            url: 'http://nodejs.cn/static/images/logo.svg',
            name: 'logo.svg',
            size: 5925,
            type: 'image/svg+xml'
        }
    ];

    constructor() {

    }

    ngOnInit() {

    }

    onBasicUpload(event) {
        console.log(1);
        let responseObject = JSON.parse(event.xhr.response);

        // TODO 应该优化下新上传的才刷新
        this.uploadedFiles = this.uploadedFiles.concat(
            responseObject.data.files
        );
        // alert('上传成功');
    }
}
