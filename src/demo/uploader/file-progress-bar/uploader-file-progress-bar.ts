import { Component } from '@angular/core';

@Component({
    selector: 'demo-uploader-file-progress-bar',
    templateUrl: './uploader-file-progress-bar.html',
    styleUrls: ['./uploader-file-progress-bar.less']
})
export class UploaderFileProgressBarDemo {

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

    onFileBarUpload(event) {
    }
}
