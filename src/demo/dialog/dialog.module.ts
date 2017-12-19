import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from '../../component/dialog';
import { ButtonModule } from '../../component/button';
import { TooltipModule } from '../../component/tooltip';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { DialogDemo } from './dialog';
import { DialogBasicDemo } from './basic/dialog-basic';
import { DialogContentDemo } from './content/dialog-content';
import { DialogDynamicDemo } from './dynamic/dialog-dynamic';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        TooltipModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DialogDemo,
        DialogBasicDemo,
        DialogContentDemo,
        DialogDynamicDemo
    ],
    providers: [],
    exports: []
})
export class DialogDemoModule { }
