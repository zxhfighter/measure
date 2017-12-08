import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarModule } from '../../component/progress-bar';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { ProgressBarDemo } from './progress-bar';
import { ProgressbarBasicDemo } from './basic/progress-bar-basic';
import { ProgressbarCircularDemo } from './circular/progress-bar-circular';

@NgModule({
    imports: [
        CommonModule,
        ProgressBarModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        ProgressBarDemo,
        ProgressbarBasicDemo,
        ProgressbarCircularDemo
    ],
    providers: [],
    exports: []
})
export class ProgressbarDemoModule { }
