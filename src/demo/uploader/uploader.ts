import { Component } from '@angular/core';

@Component({
    selector: 'demo-uploader',
    templateUrl: './uploader.html',
    styleUrls: ['./uploader.less']
})
export class UploaderDemo {

    tsCodeBasic: string = require('!!raw-loader!./basic/uploader-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/uploader-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/uploader-basic.less');

    tsCodeFileProgressBar: string = require('!!raw-loader!./file-progress-bar/uploader-file-progress-bar.ts');
    htmlCodeFileProgressBar: string = require('!!raw-loader!./file-progress-bar/uploader-file-progress-bar.html');
    lessCodeFileProgressBar: string = require('!!raw-loader!./file-progress-bar/uploader-file-progress-bar.less');

    tsCodeFileProgressText: string = require('!!raw-loader!./file-progress-text/uploader-file-progress-text.ts');
    htmlCodeFileProgressText: string = require('!!raw-loader!./file-progress-text/uploader-file-progress-text.html');
    lessCodeFileProgressText: string = require('!!raw-loader!./file-progress-text/uploader-file-progress-text.less');

    tsCodeFileVertical: string = require('!!raw-loader!./file-vertical/uploader-file-vertical.ts');
    htmlCodeFileVertical: string = require('!!raw-loader!./file-vertical/uploader-file-vertical.html');
    lessCodeFileVertical: string = require('!!raw-loader!./file-vertical/uploader-file-vertical.less');

    tsCodeImageProgressBar: string = require('!!raw-loader!./image-progress-bar/uploader-image-progress-bar.ts');
    htmlCodeImageProgressBar: string = require('!!raw-loader!./image-progress-bar/uploader-image-progress-bar.html');
    lessCodeImageProgressBar: string = require('!!raw-loader!./image-progress-bar/uploader-image-progress-bar.less');
}
