import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from '../../component/toast';
import { ButtonModule } from '../../component/button';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { ToastDemo } from './toast';
import { ToastHrefDemo } from './href/toast-href';

@NgModule({
    imports: [
        CommonModule,
        ToastModule,
        ButtonModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        ToastDemo,
        ToastHrefDemo
    ],
    providers: [],
    exports: []
})
export class ToastDemoModule { }
