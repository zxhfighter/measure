import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from '../../component/dialog';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { DialogDemo } from './dialog';
import { DialogBasicDemo } from './basic/dialog-basic';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DialogDemo,
        DialogBasicDemo
    ],
    providers: [],
    exports: []
})
export class DialogDemoModule { }
