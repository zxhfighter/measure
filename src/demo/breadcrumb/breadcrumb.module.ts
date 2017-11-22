import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BreadcrumbModule} from '../../component/breadcrumb';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoBreadcrumb} from './breadcrumb';
import {DemoBreadcrumbHref} from './href/breadcrumb-href';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoBreadcrumb,
        DemoBreadcrumbHref
    ],
    providers: [],
    exports: []
})
export class BreadcrumbDemoModule {}
