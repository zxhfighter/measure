import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RatingModule } from '../../component/rating';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { RatingDemo } from './rating';
import { RatingBasicDemo } from './basic/rating-basic';
import { RatingFormDemo } from './form/rating-form';
import { RatingTooltipDemo } from './tooltip/rating-tooltip';
import { RatingThemeDemo } from './theme/rating-theme';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RatingModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        RatingDemo,
        RatingBasicDemo,
        RatingFormDemo,
        RatingTooltipDemo,
        RatingThemeDemo
    ],
    providers: [],
    exports: []
})
export class RatingDemoModule { }
