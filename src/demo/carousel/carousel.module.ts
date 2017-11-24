import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarouselModule} from '../../component/carousel';
import {CodeBoxModule} from '../../component/code-box';
import {CodeHighlighterModule} from '../../component/code-highlighter';

import {DemoCarousel} from './carousel';
import {DemoCarouselBasic} from './basic/carousel-basic';
import {DemoCarouselAuto} from './auto/carousel-auto';
import {DemoCarouselLarge} from './large/carousel-large';
import {DemoCarouselTitle} from './title/carousel-title';
import {DemoCarouselArrow} from './arrow/carousel-arrow';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        DemoCarousel,
        DemoCarouselBasic,
        DemoCarouselAuto,
        DemoCarouselLarge,
        DemoCarouselTitle,
        DemoCarouselArrow
    ],
    providers: [],
    exports: []
})
export class CarouselDemoModule {}
