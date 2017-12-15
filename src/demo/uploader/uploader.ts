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
            fileUid: 123456,
            name: 'bd_logo1.png',
            size: 7877,
            type: 'image/jpeg'
        },
        {
            url: 'http://nodejs.cn/static/images/logo.svg',
            fileUid: 234567,
            name: 'logo.svg',
            size: 5925,
            type: 'image/svg+xml'
        }
    ];

    uploadedFilesList: any[] = [];

    constructor() {
        for (let i = 0; i < 4; i++) {
            // 深拷贝，避免四个例子的数据源共享
            this.uploadedFilesList.push(this.uploadedFiles.concat());
        }
    }

    ngOnInit() {

    }

    onImageUpload(event) {
        const responseObject = JSON.parse(event.xhr.response);
        // event.file = responseObject.data.files[0];
        const file = event.file;
        file.url = responseObject.data.files[0].url;
    }

    onImageBarUpload(event) {
        const responseObject = JSON.parse(event.xhr.response);
        const file = event.file;
        file.url = responseObject.data.files[0].url;
    }

    onFileUpload(event) {
    }

    onFileBarUpload(event){

    }

}
