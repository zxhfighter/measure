import {
    Component, Input, Output, EventEmitter, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    AfterViewInit, ViewChild, Renderer2, ElementRef,
    ChangeDetectorRef, QueryList, ViewChildren
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { min } from 'rxjs/operators/min';
import { ElementDef } from '@angular/core/src/view';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switch';

import { merge } from 'rxjs/observable/merge';
import { SliderHandComponent } from './slider-hand';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
};

export class Hand {
    initX: number;
}

export class Info {
    initX: number;
    endX: number;
}

export class Scope {
    [index: number]: Hand;
}

@Component({
    selector: 'nb-slider',
    templateUrl: './slider.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-slider'
    },
    exportAs: 'nbSlider'
})
export class SliderComponent implements OnInit, ControlValueAccessor {

    @Input() min: number = 100;

    @Input() max: number = 200;

    @Input() value: any = this.min;

    @Input() range: boolean = true;

    @Input() disabled: boolean = false;

    @ViewChild('slider') _slider: ElementRef;

    @ViewChild('sliderTracker') _tracker: ElementRef;

    @ViewChildren(SliderHandComponent) _hand: QueryList<SliderHandComponent>;

    hands: Hand[] = [];
    limitMove: number;
    // initX: number;
    initRangeX?: number;
    // active: true;

    constructor(
        private render: Renderer2,
        private _cd: ChangeDetectorRef,
        private el: ElementRef
    ) {
        this.render = render;
    }

    ngOnInit() {
        // 设置hand能移动的范围值
        const slider = this._slider.nativeElement as HTMLElement;
        this.limitMove = slider.clientWidth;

        const tracker = this._tracker.nativeElement as HTMLElement;
        let trackerWidth: any;
        let trackerMargin: any;
        let value = this.range ? this.value[0] : this.value;

        // 根据输入值设置hand初始值
        this.hands.push({
            initX: this.getTrackerWidth(value)
        });
        trackerWidth = this.getTrackerWidth(value);
        if (this.range) {
            // 根据输入值设置tracker初始值, 包括width和margin-left
            trackerWidth = this.getTrackerWidth(this.value);
            // this.initRangeX = this.getTrackerWidth(this.value[1]);
            // 根据输入值设置hand初始值
            this.hands.push({
                initX: this.getTrackerWidth(this.value[1])
            });
            this.render.setStyle(tracker, 'margin-left', `${this.hands[0].initX}%`);
        }

        this.render.setStyle(tracker, 'width', `${trackerWidth}%`);
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
    getTrackerWidth(value: number | Array<number>) {
        let trackerMin = value[0] ? value[0] : this.min;
        let trackerMax = value[1] ? value[1] : value;
        return (trackerMax - trackerMin) / (this.max - this.min) * 100;
    }

    /**
     * 更新slider
     * @param info Info
     */
    updateSlider(info: Info) {
        const tracker = this._tracker.nativeElement as HTMLElement;
        let hands = this.hands;
        if (this.range) {
            this.getNearest(info.initX, info.endX, this.hands);
            let move = hands[1].initX - hands[0].initX;
            this.value[0] = this.getValue(hands[0].initX);
            this.value[1] = this.getValue(hands[1].initX);

            this.render.setStyle(tracker, 'width', `${Math.floor(move)}%`);
            this.render.setStyle(tracker, 'margin-left', `${Math.floor(hands[0].initX)}%`);
            return;
        }
        this.value = this.getValue(info.endX);
        this.render.setStyle(tracker, 'width', `${info.endX}%`);
    }

    /**
     * 根据position就算hand当前值
     * @param pos position
     */
    getValue(pos: number) {
        return Math.round((this.max - this.min) * pos / 100 + this.min);
    }

    /**
     * 函数适用于range为true时更新hand的位置
     * @param target 当前移动的hand
     * @param endX 当前hand移动到的新位置
     * @param scope Scope 两个hand的原始位置
     */
    getNearest(target: number, endX: number, scope: Scope) {
        let x0 = scope[0].initX;
        let x1 = scope[1].initX;
        // let current = target;
        // if (Math.abs(endX - x0) < Math.abs(endX - x1)) {
        //     scope[0].initX = endX;
        // }
        // else {
        //     scope[1].initX = endX;
        // }
        if (Math.abs(Math.floor(target - x0)) < Math.abs(Math.floor(target - x1))) {
            if (endX < x1) {
                scope[0].initX = endX;
            }
            else {
                scope[0].initX = x1;
                scope[1].initX = endX;
            }
        }
        else {
            if (endX > x0) {
                scope[1].initX = endX;
            }
            else {
                scope[0].initX = endX;
                scope[1].initX = x0;
            }
        }
    }

    // pauseEvent(e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    // }

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
    writeValue(value: any) {
        if (value) {
            this.value = value;
            this._cd.markForCheck();
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

        // this._cd.markForCheck();
    }
}
