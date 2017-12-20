import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    ViewChild, Renderer2, ElementRef,
    SimpleChanges
} from '@angular/core';

import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { merge } from 'rxjs/observable/merge';
import { initNgModule } from '@angular/core/src/view/ng_module';
import { SliderService } from './slider.service';
import { TooltipDirective } from '../../component/tooltip';

@Component({
    selector: 'nb-slider-hand',
    template: '<div #sliderHand class="nb-slider-hand" [nbTooltip]="value" placement="top" [ngStyle]="style"></div>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget'
    },
    exportAs: 'nbSliderHand'
})

export class SliderHandComponent implements OnInit {
    /**
     * The range of dragging, width or height of the component
     */
    @Input() limitMove: number = 0;

    /**
     * Orientation of the component
     */
    @Input() orientation;
    /**
     * The init position of hand
     */
    @Input() initPos: number = 0;

    /**
     * Whether the slider is disabled or not
     */
    @Input() disabled: boolean = false;

    /**
     * Max value of the dragging
     */
    @Input() max: number = 0;

    /**
     * Min value of the dragging
     */
    @Input() min: number = 0;

    /**
     * Step of dragging
     */
    @Input() step: number = 1;

    value: string = '';

    /**
     * The event emitted when slider value changes, emit the init position and end position of hand
     */
    @Output() change: EventEmitter<object> = new EventEmitter<object>();

    @ViewChild('sliderHand') _hand: ElementRef;

    @ViewChild(TooltipDirective) tooltip: TooltipDirective;

    style: object = {};

    constructor(
        private render: Renderer2,
        private service: SliderService
    ) {
        this.render = render;
    }

    ngOnInit() {
        this.updateStyle(this.initPos);

        if (this.disabled) {
            return;
        }
        if ((this.max - this.min) % this.step !== 0) {
            throw new Error('step需能被（max-min）整除');
        }

        this.bindEvent();
    }

    /**
     * Bind element event
     */
    bindEvent() {
        const me = this;
        const hand = this._hand.nativeElement as HTMLElement;

        const mouseDown$ = fromEvent(hand, 'mousedown');
        const mouseMove$ = fromEvent(document, 'mousemove');
        const mouseUp$ = fromEvent(document, 'mouseup');
        mouseDown$
            .map((event: MouseEvent) => {
                const target = event.target as HTMLElement;

                let initPos = me.orientation
                    ? parseInt(target.style.left as string)
                    : parseInt(target.style.bottom as string);
                return {
                    // 返回mousedown时的hand位置
                    initPos,
                    event
                };
            })
            .switchMap((initialState) => {
                // mousedown时的鼠标位置
                // 锁定当前移动的hand
                const { clientX, clientY } = initialState.event;
                const target = initialState.event.target as HTMLElement;
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
                        // hand每一次移动前的位置
                        initPos: me.orientation
                            ? parseFloat(target.style.left as string)
                            : parseFloat(target.style.bottom as string)
                    };
                })
                    .takeUntil(mouseUp$);
            })
            .subscribe((pos) => {
                let endPos = pos.endPos;
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
                if (Math.abs(Math.abs(move) - step) < 0) {
                    return;
                }
                else {
                    move = Math.round(move / step) * step;
                }
                endPos = initPos + move;
                endPos = endPos > 0 ? endPos : 0;
                // this.style[this.orientation ? 'left' : 'bottom'] = endPos;
                me.updateStyle(endPos);
                me.change.emit({ endPos, initPos });

            });
    }

    /**
     * update end position of hand
     * @param val position
     */
    updateStyle(val: number) {
        const hand = this._hand.nativeElement as HTMLElement;
        let style = this.orientation ? 'left' : 'bottom';
        // this.style[this.orientation ? 'left' : 'bottom'] = val;
        this.render.setStyle(hand, style, `${val}%`);

        // tooltip
        let value = this.service.getValue(val, this.step, this.min, this.max);
        this.value = value + '';
        // this.style[this.orientation ? 'left' : 'bottom'] = value;
        this.render.setStyle(hand, style, value);
        this.tooltip.needReposition();
    }
}
