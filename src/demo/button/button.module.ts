import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonModule} from '../../component/button';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoButton} from './button';
import {DemoButtonTheme} from './themes/button-theme';
import {DemoButtonSize} from './size/button-size';
import {DemoButtonLink} from './link/button-link';
import {DemoButtonIcon} from './icon/button-icon';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoButton,
        DemoButtonTheme,
        DemoButtonSize,
        DemoButtonLink,
        DemoButtonIcon
    ],
    providers: [],
    exports: []
})
export class ButtonDemoModule {}
