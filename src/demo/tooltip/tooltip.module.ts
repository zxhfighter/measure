import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from '../../component/tooltip';
import { OverlayModule } from '../../component/overlay';
import { ButtonModule } from '../../component/button';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { TooltipDemo } from './tooltip';
import { TooltipBasicDemo } from './basic/tooltip-basic';
import { TooltipContentDemo } from './content/tooltip-content';
import { TooltipEmbeddedDemo } from './embedded/tooltip-embedded';
import { TooltipInputFocusDemo } from './input-focus/tooltip-input-focus';
import { TooltipOthersTriggerDemo } from './others-trigger/tooltip-others-trigger';
import { TooltipThemesDemo } from './themes/tooltip-themes';
import { TooltipStaticallyDemo } from './statically/tooltip-statically';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
        OverlayModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        TooltipDemo,
        TooltipBasicDemo,
        TooltipContentDemo,
        TooltipEmbeddedDemo,
        TooltipInputFocusDemo,
        TooltipOthersTriggerDemo,
        TooltipThemesDemo,
        TooltipStaticallyDemo
    ],
    providers: [],
    exports: []
})
export class TooltipDemoModule { }
