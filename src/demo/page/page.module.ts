import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageModule } from '../../component/page';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { PageDemo } from './page';
import { PageSizeDemo } from './size/page-size';

@NgModule({
    imports: [
        CommonModule,
        PageModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        PageDemo,
        PageSizeDemo,
    ],
    providers: [],
    exports: []
})
export class PageDemoModule { }
