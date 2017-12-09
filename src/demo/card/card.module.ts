import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../../component/button';
import { CardModule } from '../../component/card';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { CardDemo } from './card';
import { CardBasicDemo } from './basic/card-basic';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        CardDemo,
        CardBasicDemo
    ],
    providers: [],
    exports: []
})
export class CardDemoModule { }
