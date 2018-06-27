import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from '../../component/tabs';
import { TooltipModule } from '../../component/tooltip';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { TabsDemo } from './tabs';
import { TabsBasicDemo } from './basic/tabs-basic';
import { TabsCustomTitleDemo } from './custom-title/tabs-custom-title';
import { TabsContentDemo } from './content/tabs-content';

@NgModule({
    imports: [
        CommonModule,
        TabsModule,
        CodeBoxModule,
        CodeHighlighterModule,
        TooltipModule
    ],
    declarations: [
        TabsDemo,
        TabsBasicDemo,
        TabsCustomTitleDemo,
        TabsContentDemo
    ],
    providers: [],
    exports: []
})
export class TabsDemoModule { }
