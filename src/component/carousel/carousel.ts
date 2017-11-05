import {
    Component, Input, Output, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, OnDestroy
} from '@angular/core';

import {OnChange} from '../core/decorators';

/**
 * carousel item inteface
 */
export interface CarouselItem {

    /** image title */
    title: string;

    /** image src  */
    imageUrl: string;

    /** target link, optional */
    href?: string;
}

/**
 * Carousel Component
 */
@Component({
    selector: 'nb-carousel',
    templateUrl: './carousel.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-carousel',
        '(mouseover)': '_onMouseOver()',
        '(mouseout)': '_onMouseOut()'
    }
})
export class CarouselComponent implements AfterViewInit {

    /** Whether the carousel can auto play  */
    @Input() auto: boolean = false;

    /** The interval when auto play */
    @Input() interval: number = 3;

    /** Whether the carousel show title navigation */
    @Input() showTitle: boolean = false;

    /** carousel width */
    @OnChange()
    @Input() width: number;

    /** carousel datasource */
    @Input() datasource: CarouselItem[] = [
        {title: 'apple', imageUrl: 'https://images.unsplash.com/reserve/bIdO4DDS4qwVF6pHN4qr__MG_1605.jpg?dpr=2&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
        {title: 'people', imageUrl: 'https://images.unsplash.com/photo-1500440853933-3796d0182c96?dpr=2&auto=format&fit=crop&w=568&h=426&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
        {title: 'star', imageUrl: 'https://images.unsplash.com/photo-1488485300416-de7f8f876d4b?dpr=2&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'}
    ];

    /** carousel active index */
    @Input() activeIndex: number = 0;

    /** carousel custom style skin */
    @Input() skin: string = '';

    /**
     * auto play timer
     * @docs-private
     */
    _timer: any;

    /**
     * compute left position
     *
     * @readonly
     * @docs-private
     */
    get leftPos() {
        return -this.activeIndex * this.width;
    }

    constructor(
        private _el: ElementRef,
        private _render: Renderer2,
        private _cd: ChangeDetectorRef
    ) {}

    /**
     * navigate to specific index
     *
     * @param {number} idx - index
     */
    navigate(idx: number) {
        this.activeIndex = idx;
    }

    /**
     * navigate to prev item
     */
    prev() {
        this.activeIndex = this.activeIndex - 1;
    }

    /**
     * navigate to next item
     */
    next() {
        this.activeIndex = this.activeIndex + 1;
    }

    ngAfterViewInit() {
        let self = this;

        let className = self._el.nativeElement.className;
        if (self.skin) {
            className += ` nb-carousel-${self.skin}`;
            self._render.setAttribute(self._el.nativeElement, 'class', className);
        }

        this.poll();
    }

    _onMouseOver() {
        clearInterval(this._timer);
    }

    _onMouseOut() {
        this.poll();
    }

    poll() {
        const self = this;

        if (self.auto) {
            self._timer = setInterval(() => {

                self.next();

                if (self.activeIndex === self.datasource.length) {
                    self.activeIndex = 0;
                }

                self._cd.markForCheck();

            }, self.interval * 1000);
        }
    }

    ngOnDestroy() {
        clearInterval(this._timer);
    }
}
