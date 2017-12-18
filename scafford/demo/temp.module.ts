import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= upperName %>Module } from '../../component/<%= name %>';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { <%= upperName %>Demo } from './<%= name %>';
import { <%= upperName %>BasicDemo } from './basic/<%= name %>-basic';

@NgModule({
    imports: [
        CommonModule,
        <%= upperName %>Module,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        <%= upperName %>Demo,
        <%= upperName %>BasicDemo
    ],
    providers: [],
    exports: []
})
export class <%= upperName %>DemoModule { }
