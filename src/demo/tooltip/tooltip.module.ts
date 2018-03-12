import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from '../../component/tooltip';
import { OverlayModule } from '../../component/overlay';
import { ButtonModule } from '../../component/button';
import { InputModule } from '../../component/input';
import { CodeBoxModule } from '../../component/code-box';
import { TableModule } from '../../component/table';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { TooltipDemo } from './tooltip';
import { TooltipBasicDemo } from './basic/tooltip-basic';
import { TooltipDynamicDemo } from './dynamic/tooltip-dynamic';
import { TooltipEmbeddedDemo } from './embedded/tooltip-embedded';
import { TooltipInputFocusDemo } from './input-focus/tooltip-input-focus';
import { TooltipOthersTriggerDemo } from './others-trigger/tooltip-others-trigger';
import { TooltipThemesDemo } from './themes/tooltip-themes';
import { TooltipStaticDemo } from './static/tooltip-static';
import { TooltipShareDemo } from './share/tooltip-share';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
        OverlayModule,
        CodeBoxModule,
        TableModule,
        InputModule,
        CodeHighlighterModule
    ],
    declarations: [
        TooltipDemo,
        TooltipBasicDemo,
        TooltipDynamicDemo,
        TooltipEmbeddedDemo,
        TooltipInputFocusDemo,
        TooltipOthersTriggerDemo,
        TooltipThemesDemo,
        TooltipStaticDemo,
        TooltipShareDemo
    ],
    providers: [],
    exports: []
})
export class TooltipDemoModule { }
