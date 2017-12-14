import {
    Component, Input, Output, EventEmitter, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    AfterViewInit, ViewChild, Renderer2, ElementRef,
    ChangeDetectorRef, QueryList, ViewChildren
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { min } from 'rxjs/operators/min';
// import { ElementDef } from '@angular/core/src/view';

// // import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { SliderHandComponent } from './slider-hand';
import { SliderTrackerComponent } from './slider-tracker';
import { Hand, Info, Scope, CoreValue } from './slider.config';
import { OnChange } from '../core/decorators';
import { SliderService } from './slider.service';

// import _ from 'lodash';
import * as _ from 'lodash';


// import { Function } from 'estree';

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
    @Input() input: boolean = false;

    @Input() min: number = 100;

    @Input() max: number = 200;

    // @Input() value: CoreValue = this.min;

    @Input() range: boolean = false;

    // @OnChange(true)
    @Input() disabled: boolean = false;

    @Input() step: number = 1;

    @Input() useForm: boolean = false;

    @ViewChild('slider') _slider: ElementRef;

    @ViewChild(SliderTrackerComponent) _tracker: SliderTrackerComponent;

    @ViewChildren(SliderHandComponent) _hands: QueryList<SliderHandComponent>;

    private _hand: SliderHandComponent;
    // private _onModelChange: Function;

    private innerValue: CoreValue = this.min;
    // get accessor
    @Input()
    get value(): CoreValue {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    set value(v: CoreValue) {
        if (v instanceof Array || isNaN(v)) {
            this.innerValue = v;
        }
        if (v !== this.innerValue) {
            this.innerValue = +v;
        }
        // this._markForCheck();
    }

    private _orientation: any = 'horizontal';
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

    private hands: Hand[] = [];
    private limitMove: number;
    private trackerSelected: number;
    private trackerPos: number;
    private sliderHands;

    constructor(
        private render: Renderer2,
        private _cd: ChangeDetectorRef,
        private el: ElementRef,
        private service: SliderService
    ) {
        this.render = render;
    }

    ngOnInit() {
        if (this.useForm) {
            return;
        }
        this.initSlider();
    }

    ngAfterViewInit() {
        this.childInitComplete();
    }

    childInitComplete() {
        let first = _.clone(this._hands.first);
        let last = _.clone(this._hands.last);

        let sliderHands = this.sliderHands = {first, last};
    }

    initSlider() {
        this.inputValidate();

        // 设置hand能移动的范围值
        const slider = this._slider.nativeElement as HTMLElement;
        this.limitMove = slider.clientWidth;

        // 根据输入值设置hand初始值
        let value = this.range ? this.value[0] : this.value;
        this.hands.push({
            initPos: this.getTrackerSelected(value),
            active: true
        });
        this.trackerSelected = this.getTrackerSelected(value);

        if (this.range) {
            // 根据输入值设置tracker初始值, 包括selected and position
            this.trackerSelected = this.getTrackerSelected(this.value);
            this.trackerPos = this.hands[0].initPos;
            // 根据输入值设置hand初始值
            this.hands.push({
                initPos: this.getTrackerSelected(this.value[1]),
                active: true
            });
        }
        this._markForCheck();
    }

    /**
     *  输入值校验
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
     * 根据输入值计算tracker的width
     * @param value input value
     */
    getTrackerSelected(value: CoreValue): number {
        let trackerMin = value[0] ? value[0] : this.min;
        let trackerMax = value[1] ? value[1] : value;
        return (trackerMax - trackerMin) / (this.max - this.min) * 100;
    }

    /**
     * 更新slider
     * @param info Info
     */
    updateSlider(info: Info) {
        let hands = this.hands;
        info.endPos = +info.endPos;

        if (this.range) {
            this.getNearest(info.initPos, info.endPos, this.hands);
            let move = hands[1].initPos - hands[0].initPos;
            this.value[0] = this.getValue(hands[0].initPos);
            this.value[1] = this.getValue(hands[1].initPos);

            this.trackerSelected = move;
            this.trackerPos = hands[0].initPos;
            return;
        }

        this.value = this.getValue(+info.endPos);
        this.trackerSelected = this.hands[0].initPos = +info.endPos;
        // 更新form model
        this._markForCheck();
    }

    /**
     * 根据position就算hand当前值
     * @param pos trackerPos
     */
    getValue(pos: number): number {
        return Math.round((this.max - this.min) * pos / 100 + this.min);
    }

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
        let hand = this._hand || this.sliderHands.first;
        hand._updateStyle(`${endPos}%`);
    }

    /**
     * 函数适用于range为true时更新hand的位置
     * @param target 当前移动的hand
     * @param endX 当前hand移动到的新位置
     * @param scope Scope 两个hand的原始位置
     */
    getNearest(target: number, endX: number, scope: Scope) {
        let x0 = scope[0].initPos;
        let x1 = scope[1].initPos;
        const hands = this.sliderHands;

        if (Math.abs((target - x0)) < Math.abs((target - x1))) {
            if (endX < x1) {
                scope[0].initPos = (endX);
                this._hand = hands.first;
            }
            else {
                scope[0].initPos = (x1);
                scope[1].initPos = (endX);
                let hand = hands.first;
                hands.first = hands.last;
                hands.last = hand;
            }
        }

        else {
            if (endX > x0) {
                scope[1].initPos = (endX);
                this._hand = hands.last;
            }
            else {
                scope[0].initPos = (endX);
                scope[1].initPos = (x0);
                let hand = hands.first;
                hands.first = hands.last;
                hands.last = hand;
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
            this.initSlider();
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
