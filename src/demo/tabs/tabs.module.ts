import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from '../../component/tabs';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { TabsDemo } from './tabs';
import { TabsBasicDemo } from './basic/tabs-basic';

@NgModule({
    imports: [
        CommonModule,
        TabsModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        TabsDemo,
        TabsBasicDemo
    ],
    providers: [],
    exports: []
})
export class TabsDemoModule { }