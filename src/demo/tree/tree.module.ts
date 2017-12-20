import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';
import { TreeModule } from '../../component/tree';

import { TreeDemo } from './tree';
import { TreeBasicDemo } from './basic/tree-basic';
import { TreeModeDemo } from './mode/tree-mode';

@NgModule({
    imports: [
        CommonModule,
        CodeBoxModule,
        CodeHighlighterModule,
        TreeModule
    ],
    declarations: [
        TreeDemo,
        TreeBasicDemo,
        TreeModeDemo
    ],
    providers: [],
    exports: []
})

export class TreeDemoModule { }
