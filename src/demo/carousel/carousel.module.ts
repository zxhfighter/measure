import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from '../../component/carousel';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { CarouselDemo } from './carousel';
import { CarouselBasicDemo } from './basic/carousel-basic';
import { CarouselAutoDemo } from './auto/carousel-auto';
import { CarouselLargeDemo } from './large/carousel-large';
import { CarouselTitleDemo } from './title/carousel-title';
import { CarouselArrowDemo } from './arrow/carousel-arrow';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        CarouselDemo,
        CarouselBasicDemo,
        CarouselAutoDemo,
        CarouselLargeDemo,
        CarouselTitleDemo,
        CarouselArrowDemo
    ],
    providers: [],
    exports: []
})
export class CarouselDemoModule { }
