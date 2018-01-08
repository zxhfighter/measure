import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '../../component/grid';
import { CodeBoxModule } from '../../component/code-box';
import { SpinnerModule } from '../../component/spinner';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { GridDemo } from './grid';
import { GridBasicDemo } from './basic/grid-basic';
import { GridGutterDemo } from './gutter/grid-gutter';
import { GridOffsetDemo } from './offset/grid-offset';
import { GridSortDemo } from './sort/grid-sort';
import { GridFlexDemo } from './flex/grid-flex';
import { GridAlignDemo } from './align/grid-align';
import { GridResponsiveDemo } from './responsive/grid-responsive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        GridModule,
        CodeBoxModule,
        CodeHighlighterModule,
        SpinnerModule
    ],
    declarations: [
        GridDemo,
        GridBasicDemo,
        GridGutterDemo,
        GridOffsetDemo,
        GridSortDemo,
        GridFlexDemo,
        GridAlignDemo,
        GridResponsiveDemo
    ],
    providers: [],
    exports: []
})
export class GridDemoModule { }
