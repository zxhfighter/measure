import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from '../../component/button';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { ButtonDemo } from './button';
import { ButtonThemeDemo } from './themes/button-theme';
import { ButtonSizeDemo } from './size/button-size';
import { ButtonLinkDemo } from './link/button-link';
import { ButtonIconDemo } from './icon/button-icon';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        ButtonDemo,
        ButtonThemeDemo,
        ButtonSizeDemo,
        ButtonLinkDemo,
        ButtonIconDemo
    ],
    providers: [],
    exports: []
})
export class ButtonDemoModule { }
