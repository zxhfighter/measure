import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';
import { SearchBoxModule } from '../../component/search-box';

import { SearchBoxDemo } from './search-box';
import { SearchBoxBasicDemo } from './basic/search-box-basic';
import { SearchBoxSuggestDemo } from './suggest/search-box-suggest';

@NgModule({
    imports: [
        CommonModule,
        CodeBoxModule,
        CodeHighlighterModule,
        SearchBoxModule
    ],
    declarations: [
        SearchBoxDemo,
        SearchBoxBasicDemo,
        SearchBoxSuggestDemo
    ],
    providers: [],
    exports: []
})

export class SearchBoxDemoModule { }
