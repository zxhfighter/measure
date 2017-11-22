import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgressBarModule} from '../../component/progress-bar';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoProgressBar} from './progress-bar';
import {DemoProgressbarBasic} from './basic/progress-bar-basic';
import {DemoProgressbarCircular} from './circular/progress-bar-circular';

@NgModule({
    imports: [
        CommonModule,
        ProgressBarModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoProgressBar,
        DemoProgressbarBasic,
        DemoProgressbarCircular
    ],
    providers: [],
    exports: []
})
export class ProgressbarDemoModule {}
