import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonModule} from '../../component/button';
import {CardModule} from '../../component/card';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoCard} from './card';
import {DemoCardBasic} from './basic/card-basic';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoCard,
        DemoCardBasic
    ],
    providers: [],
    exports: []
})
export class CardDemoModule {}
