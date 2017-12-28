import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageModule } from '../../component/page';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { PageDemo } from './page';
// import { ButtonThemeDemo } from './themes/button-theme';
import { PageSizeDemo } from './size/page-size';
// import { ButtonLinkDemo } from './link/button-link';
// import { ButtonIconDemo } from './icon/button-icon';

@NgModule({
    imports: [
        CommonModule,
        PageModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        PageDemo,
        // ButtonThemeDemo,
        PageSizeDemo,
        // ButtonLinkDemo,
        // ButtonIconDemo
    ],
    providers: [],
    exports: []
})
export class PageDemoModule { }
