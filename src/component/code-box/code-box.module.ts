import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBoxComponent } from './code-box';

import { TabsModule } from '../tabs';
import { TooltipModule } from '../tooltip';
import { CodeHighlighterModule } from '../code-highlighter';

@NgModule({
    imports: [CommonModule, TabsModule, TooltipModule, CodeHighlighterModule],
    declarations: [CodeBoxComponent],
    exports: [CodeBoxComponent]
})
export class CodeBoxModule { }
