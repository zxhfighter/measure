import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderModule } from '../../component/uploader';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { UploaderDemo } from './uploader';
import { UploaderBasicDemo } from './basic/uploader-basic';
import { UploaderFileProgressBarDemo } from './file-progress-bar/uploader-file-progress-bar';
import { UploaderFileProgressTextDemo } from './file-progress-text/uploader-file-progress-text';
import { UploaderFileVerticalDemo } from './file-vertical/uploader-file-vertical';
import { UploaderImageProgressBarDemo } from './image-progress-bar/uploader-image-progress-bar';

@NgModule({
    imports: [
        CommonModule,
        UploaderModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        UploaderDemo,
        UploaderBasicDemo,
        UploaderFileProgressBarDemo,
        UploaderFileProgressTextDemo,
        UploaderFileVerticalDemo,
        UploaderImageProgressBarDemo
    ],
    providers: [],
    exports: []
})
export class UploaderDemoModule { }
