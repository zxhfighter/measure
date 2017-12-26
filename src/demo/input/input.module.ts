import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputModule } from '../../component/input';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { InputDemo } from './input';
import { InputThemeDemo } from './themes/input-theme';
import { InputSizeDemo } from './size/input-size';

@NgModule({
    imports: [
        CommonModule,
        InputModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        InputDemo,
        InputThemeDemo,
        InputSizeDemo
    ],
    providers: [],
    exports: []
})

export class InputDemoModule { }
