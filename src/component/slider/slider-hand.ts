import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ViewChild,
    Renderer2,
    ElementRef,
    SimpleChanges
} from '@angular/core';

import { fromEvent, Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { SliderService } from './slider.service';
import { TooltipDirective } from '../index';
import { OnChange } from '../core/decorators';

@Component({
    selector: 'nb-slider-hand',
    template: ` <div #sliderHand class="nb-slider-hand" [nbTooltip]="value"
                hasArrow="true" [placement]="placement"></div>`,
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
    @OnChange(true)
    @Input() orientation;
    /**
     * The init position of hand
     */
    @Input() initPos: number = 0;

    /**
     * Whether the slider is disabled or not
     */
    @OnChange(true)
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
    placement: string = '';

    /**
     * The event emitted when slider value changes, emit the init position and end position of hand
     */
    @Output() change: EventEmitter<object> = new EventEmitter<object>();

    @ViewChild('sliderHand') _hand: ElementRef;

    @ViewChild(TooltipDirective) tooltip: TooltipDirective;

    constructor(private render: Renderer2, private service: SliderService) {
        this.render = render;
    }

    ngOnInit() {
        this.updateStyle(this.initPos);
        this.placement = this.orientation ? 'top' : 'right';

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

        mouseDown$
            .pipe(
                map((event: MouseEvent) => {
                    const target = event.target as HTMLElement;

                    let initPos = me.orientation
                        ? parseInt(target.style.left as string)
                        : parseInt(target.style.bottom as string);
                    return {
                        // 返回mousedown时的hand位置
                        initPos,
                        event
                    };
                }),
                switchMap(initState => {
                    return me.moveUntilUp(initState);
                })
            )
            .subscribe(pos => me.updateHand(pos));
    }

    /**
     * mousemove事件流
     * @param initialState mousedown时的位置信息
     */
    moveUntilUp(initialState): Observable<object> {
        const me = this;
        const mouseMove$ = fromEvent(document, 'mousemove');
        const mouseUp$ = fromEvent(document, 'mouseup');

        // mousedown时的鼠标位置
        // 锁定当前移动的hand
        const { clientX, clientY } = initialState.event;
        const target = initialState.event.target as HTMLElement;
        const initPos = initialState.initPos;
        return mouseMove$.pipe(
            map((moveEvent: MouseEvent) => {
                // 鼠标移动的距离
                let move: number;
                if (this.orientation) {
                    move = moveEvent.clientX - clientX;
                } else {
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
            }),
            takeUntil(mouseUp$)
        );
    }

    /**
     * 更新hand位置
     * @param pos mouseup时的位置信息
     */
    updateHand(pos) {
        const me = this;
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
        } else {
            move = Math.round(move / step) * step;
        }
        endPos = initPos + move;
        endPos = endPos > 0 ? endPos : 0;
        me.updateStyle(endPos);
        me.change.emit({
            endPos,
            initPos
        });
    }

    /**
     * update end position of hand
     * @param val position
     */
    updateStyle(val: number) {
        const hand = this._hand.nativeElement as HTMLElement;
        let style = this.orientation ? 'left' : 'bottom';
        this.render.setStyle(hand, style, `${val}%`);

        // tooltip
        let value = this.service.getValue(val, this.step, this.min, this.max);
        this.value = `${value}`;
        this.tooltip.needReposition();
    }
}
