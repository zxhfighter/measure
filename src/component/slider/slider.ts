import {
    Component, Input, Output, EventEmitter, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    AfterViewInit, ViewChild, Renderer2, ElementRef,
    ChangeDetectorRef, QueryList, ViewChildren
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SliderHandComponent } from './slider-hand';
import { SliderTrackerComponent } from './slider-tracker';
import { Hand, Info, Scope, CoreValue } from './slider.config';
import { SliderService } from './slider.service';
import { TooltipDirective } from '../../component/tooltip/tooltip';

import * as _ from 'lodash';
import { OnChange } from '../core/decorators';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
};

@Component({
    selector: 'nb-slider',
    templateUrl: './slider.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [SLIDER_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-slider'
    },
    exportAs: 'nbSlider'
})

export class SliderComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    /**
     * If we can use input box to change the slider value, input value should be larger than
     * min, less than max and multiple of the step.
     * Only can use when range is false
     * @default 0
     */
    @OnChange(true)
    @Input() input: boolean = false;

    /**
     * Min value of slider
     * @default 0
     */
    @Input() min: number = 0;

    /**
     * Max value of slider
     * @default 100
     */
    @Input() max: number = 100;

    /**
     * If the slider has double hands
     * @default false
     */
    @OnChange(true)
    @Input() range: boolean = false;

    /**
     * Whether the slider is disabled or not
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /**
     * The step of dragging
     * @default 1
     */
    @Input() step: number = 1;

    /**
     * Core value of the slider
     * @default 0
     */
    @Input() value: CoreValue;

    /**
     * Orientation of the slider
     * @default horizontal
     */
    @Input()
    get orientation() {
        return this._orientation;
    }
    set orientation(orientation: string) {
        if (orientation === 'horizontal') {
            this._orientation = true;
        }
        else {
            this._orientation = false;
        }
    }
    private _orientation: any = 'horizontal';

    /**
     * The event emitted when slider value changes, emit the value of slider
     */
    @Output() change: EventEmitter<CoreValue> = new EventEmitter<CoreValue>();

    /**
     * The hands init position
     * @docs-private
     */
    hands: Hand[] = [];

    /**
     * Range of the slider
     * @docs-private
     */
    limitMove: number;

    /**
     * Selected of the tracker
     * @docs-private
     */
    trackerSelected: number;

    /**
     * Position of the tracker
     * @docs-private
     */
    trackerPos: number;

    /**
     * Dragging hands copy
     * @docs-private
     */
    private sliderHands: any;

    /**
     * Current dragging hand
     * @docs-private
     */
    private _hand: SliderHandComponent;

    /**
     * Mark the current hand index
     * @docs-private
     */
    private _currentHand: number = 1;

    /**
     * If move one hand over the other
     * @docs-private
     */
    @OnChange(true)
    private _handRange: boolean = false;

    /**
     * Slider Component
     * @docs-private
     */
    @ViewChild('slider') _slider: ElementRef;

    /**
     * slider-tracker Component
     * @docs-private
     */
    @ViewChild(SliderTrackerComponent) _tracker: SliderTrackerComponent;

    /**
     * slider-hand Components
     * @docs-private
     */
    @ViewChildren(SliderHandComponent) _hands: QueryList<SliderHandComponent>;

    constructor(
        private render: Renderer2,
        private _cd: ChangeDetectorRef,
        private el: ElementRef,
        private service: SliderService
    ) {
        this.render = render;
        this.service = service;
    }

    ngOnInit() {
        setTimeout(() => {
            this.initSlider();
        }, 0);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            // this.sliderHands = this.afterView();
            this.afterView();
        }, 0);
    }

    /**
     * Dragging hands copy, because the hands'order change when dragging cross,
     * so keep a init order here
     * @docs-private
     */
    afterView() {
        this.sliderHands = _.clone(this._hands);
    }

    /**
     * Set default value
     * @docs-private
     */
    setDefaultValue() {
        if (this.range) {
            if (!this.value) {
                this.value = [];
                this.value[0] = this.value[1] = this.min;
            }
            else {
                (<number[]>this.value).map((val, i, arr) => arr[i]
                    = this.valueCheck(val, this.min));
            }
        }
        else {
            this.value = this.valueCheck(<number>this.value, this.min);
        }
    }

    /**
     * value check
     * @docs-private
     */
    valueCheck(v: any, option: number) {
        return !isNaN(v) ? v : option;
    }

    /**
     * 输入值校验
     * @docs-private
     */
    inputValidate() {
        if (this.range) {
            if (this.value[0] < this.min || this.value[0] > this.max) {
                throw new Error('Input value should larger than min and less than max');
            }
        }
        else {
            if (this.value > this.max || this.value < this.min) {
                throw new Error('Input value should larger than min and less than max');
            }
        }
    }

    /**
     * Initialize the slider and the sub components
     * @docs-private
     */
    initSlider() {
        this.setDefaultValue();
        this.inputValidate();

        // 设置hand能移动的范围值
        const slider = this._slider.nativeElement as HTMLElement;
        this.limitMove = this.orientation ? slider.clientWidth : slider.clientHeight;

        // 根据输入值设置hand, tracker初始值
        if (this.range) {
            this.trackerSelected = this.getWidthFromValue(this.value);
            this.trackerPos = this.getWidthFromValue(this.value[0]);
            this.hands.push(
                {initPos: this.trackerPos},
                {initPos: this.getWidthFromValue(this.value[1])}
            );
        }
        else {
            this.trackerSelected = this.getWidthFromValue(this.value);
            this.hands.push({initPos: this.trackerSelected});
        }

        this.emitChange();
    }

    /**
     * 根据输入值计算tracker的width
     * @param value input value
     * @docs-private
     */
    getWidthFromValue(value: CoreValue): number {
        let trackerMin = this.valueCheck(value[0], this.min);
        let trackerMax = this.valueCheck(value[1], <number>value);

        return (trackerMax - trackerMin) / (this.max - this.min) * 100;
    }

    /**
     * 输入框输入slider value，限于range为false
     * @docs-private
     */
    inputValue(v) {
        let calculated = +v;
        if (calculated > this.max
            || calculated < this.min
            || (calculated % this.step !== 0)
        ) {
            return;
        }
        this.value = calculated;
        let value = this.trackerSelected = this.getWidthFromValue(calculated);
        this.sliderHands.first.updateStyle(value);
        this.emitChange();
    }

    /**
     * 更新slider
     * @param info Info
     * @docs-private
     */
    updateSlider(info: Info) {
        let hands = this.hands;

        if (this.range) {
            this.getNearest(info.initPos, info.endPos, this.hands);
            let move = hands[1].initPos - hands[0].initPos;

            this.value[0] = this.service.getValue(hands[0].initPos, this.step, this.min, this.max);
            this.value[1] = this.service.getValue(hands[1].initPos, this.step, this.min, this.max);

            this.trackerSelected = move;
            this.trackerPos = hands[0].initPos;
            this.emitChange();
            return;
        }

        this.value = this.service.getValue(info.endPos, this.step, this.min, this.max);
        this.trackerSelected = hands[0].initPos = info.endPos;
        this.emitChange();
    }

    /**
     * emit change
     * @docs-private
     */
    emitChange() {
        this.change.emit(this.value);
        // 更新form model
        this._markForCheck();
    }

    /**
     * rail click handler
     * @docs-private
     */
    clickHandler(e) {
        if (this.disabled) {
            return;
        }
        let endOffset = this.orientation ? e.offsetX : (this.limitMove - e.offsetY);
        let endPos = endOffset / this.limitMove * 100;
        let step = this.step / (this.max - this.min) * 100;
        endPos = Math.floor(endPos / step) * step;

        this.updateSlider({
            initPos: endPos,
            endPos: endPos
        });
        let hand = this._hand || this.sliderHands.last
        ;
        hand.updateStyle(endPos);
    }

    /**
     * 算法适用于range为true时计算hand的位置
     * @param initX 当前移动的hand
     * @param endX 当前hand移动到的新位置
     * @param scope Scope 两个hand的原始位置
     * @docs-private
     */
    getNearest(initX: number, endX: number, scope: Scope) {
        let x0 = scope[0].initPos;
        let x1 = scope[1].initPos;
        let hands = this.sliderHands;

        if (x0 === x1) {
            if (endX > x0) {
                scope[0].initPos = x0;
                scope[1].initPos = endX;
            }
            else {
                scope[0].initPos = endX;
                scope[1].initPos = x0;
            }
            if (!this._currentHand) {
                if (endX > x0) {
                    this._handRange = !this._handRange;
                }
            } else {
                if (endX < x0) {
                    this._handRange = !this._handRange;
                }
            }
            return;
        }

        if (Math.abs((initX - x0)) < Math.abs((initX - x1))) {
            // move x0
            if (endX < x1) {
                scope[0].initPos = (endX);
                this._handRange
                    ? (this._hand = hands.last)
                    : (this._hand = hands.first);
                this._currentHand = 0;
            }
            else {
                scope[0].initPos = (x1);
                scope[1].initPos = (endX);
                this._handRange = !this._handRange;
                this._currentHand = 1;
            }

        }

        else {
            // move x1
            if (endX > x0) {
                scope[1].initPos = (endX);
                this._handRange
                    ? (this._hand = hands.first)
                    : (this._hand = hands.last);
                this._currentHand = 1;
            }
            else {
                scope[0].initPos = (endX);
                scope[1].initPos = (x0);
                this._handRange = !this._handRange;
                this._currentHand = 0;
            }
        }
    }

    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    private _onModelChange: Function;

    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn On change callback function.
     */
    registerOnChange(fn: Function) {
        this._onModelChange = fn;
    }

    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    private _onTouch: Function;

    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn On touch callback function.
     */
    registerOnTouched(fn: Function) {
        this._onTouch = fn;
    }

    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {any} value - value to be set to the model.
     */
    writeValue(value: CoreValue) {
        if (value) {
            this.value = value;
            // this._cd.markForCheck();
        }
    }

    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param {boolean} isDisabled - Whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * update form model value and mark for check
     * @docs-private
     */
    _markForCheck() {
        if (this._onModelChange) {
            this._onModelChange(this.value);
        }

        if (this._onTouch) {
            this._onTouch(this.value);
        }

        this._cd.markForCheck();
    }
}
