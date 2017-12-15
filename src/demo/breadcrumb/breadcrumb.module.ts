import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from '../../component/breadcrumb';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { BreadcrumbDemo } from './breadcrumb';
import { BreadcrumbHrefDemo } from './href/breadcrumb-href';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        BreadcrumbDemo,
        BreadcrumbHrefDemo
    ],
    providers: [],
    exports: []
})
export class BreadcrumbDemoModule { }
