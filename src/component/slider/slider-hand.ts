import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    AfterViewInit, ViewChild, Renderer2, ElementRef, OnChanges,
    SimpleChanges, HostListener
} from '@angular/core';
import { min } from 'rxjs/operators/min';
import { ElementDef } from '@angular/core/src/view';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { merge } from 'rxjs/observable/merge';
import { SliderService } from './slider.service';
import { Action } from 'rxjs/scheduler/Action';

@Component({
    selector: 'nb-slider-hand',
    templateUrl: './slider-hand.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget'
    },
    exportAs: 'nbSliderHand'
})

export class SliderHandComponent implements OnInit {

    @Input() limitMove: number = 0;

    @Input() orientation;

    @Input() initPos;

    @Input() disabled;

    @Input() max: number;

    @Input() min: number;

    @Input() step: number;

    @Input() active: boolean;

    @Output() change: EventEmitter<object> = new EventEmitter<object>();

    @ViewChild('sliderHand') _hand: ElementRef;

    style: object = {};

    constructor(
        private render: Renderer2,
        private el: ElementRef
    ) {
        this.render = render;
    }

    ngOnInit() {
        this._updateStyle(`${this.initPos}%`);
        if (this.disabled) {
            return;
        }
        if ((this.max - this.min) % this.step !== 0) {
            throw new Error('step需能被（max-min）整除');
        }

        this.bindEvent();
    }

    bindEvent() {
        const me = this;
        const hand = this._hand.nativeElement as HTMLElement;

        const mouseDown$ = fromEvent(hand, 'mousedown');
        const mouseMove$ = fromEvent(document, 'mousemove');
        const mouseUp$ = fromEvent(document, 'mouseup');
        mouseDown$
            .map((event: MouseEvent) => {
                let style = event.target.style;
                let initPos = me.orientation
                    ? parseInt(style.left)
                    : parseInt(style.bottom);
                return {
                    // 返回mousedown时的hand位置
                    initPos,
                    event
                };
            })
            .switchMap((initialState) => {
                // mousedown时的鼠标位置
                // 锁定当前移动的hand
                const { clientX, clientY, target } = initialState.event;
                const initPos = initialState.initPos;
                return mouseMove$.map((moveEvent: MouseEvent) => {
                    // 鼠标移动的距离
                    let move: number;
                    if (this.orientation) {
                        move = moveEvent.clientX - clientX;
                    }
                    else {
                        move = clientY - moveEvent.clientY;
                    }
                    let endPos = move / me.limitMove * 100 + initPos;

                    return {
                        // hand的新位置
                        endPos,
                        // endPos: moveEvent.clientX,
                        // hand每一次移动前的位置
                        initPos: me.orientation
                            ? parseInt(target.style.left)
                            : parseInt(target.style.bottom)
                    };
                })
                    .takeUntil(mouseUp$);
            })
            .subscribe((pos) => {
                let endPos = pos.endPos;
                // let endPos = pos.endPos;
                let initPos = pos.initPos;
                if (endPos < 0) {
                    endPos = 0;
                }
                if (endPos > 100) {
                    endPos = 100;
                }
                let move = endPos - initPos;
                let step = me.step / (me.max - me.min) * 100;

                // 重置hand
                if (Math.abs(move) < step) {
                    return;
                }
                else {
                    move = Math.floor(move / step) * step;
                }
                endPos = initPos + move;
                // this.style[this.orientation ? 'left' : 'bottom'] = `${endPos}%`;
                me._updateStyle(`${endPos}%`);
                me.change.emit({ endPos, initPos });
            });
    }

    _updateStyle(value) {
        const hand = this._hand.nativeElement as HTMLElement;
        let style = this.orientation ? 'left' : 'bottom';
        // this.style[this.orientation ? 'left' : 'bottom'] = value;
        this.render.setStyle(hand, style, value);
    }
}
