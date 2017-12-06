import {
    Component, Input, Output, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, OnDestroy
} from '@angular/core';

import { OnChange } from '../core/decorators';

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
export class CarouselComponent implements AfterViewInit, OnDestroy {

    /**
     * Whether the carousel can auto play
     * @default false
     */
    @Input() auto: boolean = false;

    /**
     * The time interval(milliseconds) when auto play
     * @default 3000
     */
    @Input() interval: number = 3000;

    /**
     * Whether the carousel show title navigation
     * @default false
     */
    @Input() showTitle: boolean = false;

    /**
     * carousel width, in pixels
     */
    @OnChange()
    @Input() width: number;

    /**
     * carousel datasource, each item with a `title`、`imageUrl`、`href`(optional) property
     * @default []
     */
    @Input() datasource: CarouselItem[] = [];

    /**
     * carousel active index
     * @default 0
     */
    @Input() activeIndex: number = 0;

    /**
     * carousel custom style skin, will add a class `nb-carousel-skinName` to the host element
     * @default ''
     */
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
    ) { }

    /**
     * navigate to specific index
     *
     * @param {number} idx - index
     */
    navigate(idx: number): void {
        this.activeIndex = idx;
    }

    /**
     * navigate to prev item
     */
    prev(): void {
        this.activeIndex = this.activeIndex - 1;
    }

    /**
     * navigate to next item
     */
    next(): void {
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

    /**
     * @docs-private
     */
    poll() {
        const self = this;

        if (self.auto) {
            self._timer = setInterval(() => {

                self.next();

                if (self.activeIndex === self.datasource.length) {
                    self.activeIndex = 0;
                }

                self._cd.markForCheck();

            }, self.interval);
        }
    }

    ngOnDestroy() {
        clearInterval(this._timer);
    }
}
