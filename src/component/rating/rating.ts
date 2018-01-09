import {
    Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OnChange } from '../core/decorators';
import { addClass } from '../util/dom';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingComponent),
    multi: true
};

@Component({
    selector: 'nb-rating',
    templateUrl: './rating.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [RATING_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-rating',
        '[class.nb-rating-readonly]': 'readonly',
        '[class.nb-rating-disabled]': 'disabled'
    },
    exportAs: 'nbRating'
})
export class RatingComponent implements OnInit, ControlValueAccessor, AfterViewInit {

    /**
     * event emitted when rating change
     */
    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    /**
     * total stars
     * @default 5
     */
    @Input() total: number = 5;

    /**
     * current star rating
     */
    @Input() value: number = 3;

    /**
     * whether to support half star, not yet supported
     * @default false
     */
    @OnChange(true)
    @Input() halfStar: boolean = false;

    /**
     * whether the rating is read-only, when in read-only mode, the stars loss interactivity
     * @default false
     */
    @OnChange(true)
    @Input() readonly: boolean = false;

    /**
     * whether show tip when hover the stars
     * @default false
     */
    @OnChange(true)
    @Input() showTip: boolean = false;

    /**
     * whether the rating is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /**
     * custom theme
     */
    @Input() theme: string = '';

    /**
     * when `showTip` is set, you can use this to set tooltip message, you can use a string template
     *  or you can use you own custom tooltip function
     */
    @Input() tipTemplate: string | Function = '{i} 星';

    _starArray: number[] = [];
    _tempValue: number | null;

    constructor(
        private _cd: ChangeDetectorRef,
        private _el: ElementRef
    ) {}

    /**
     * get tooltip message
     *
     * @param {number} i - star number
     * @return {string}
     * @docs-private
     */
    getTip(i: number) {
        if (this.readonly || this.disabled) {
            return null;
        }

        if (typeof this.tipTemplate === 'string') {
            return this.tipTemplate.replace('{i}', i + '');
        }
        else if (typeof this.tipTemplate === 'function') {
            return this.tipTemplate.call(this, i);
        }
    }

    /**
     * whether allow tooltip
     *
     * @return {boolean}
     * @docs-private
     */
    allowShowTip() {
        if (this.disabled || this.readonly) {
            return false;
        }

        return this.showTip;
    }

    ngOnInit() {
        this._starArray = this._genArray(this.total);
    }

    _genArray(limit: number) {
        let arr: number[] = [];
        let i = 1;
        while (i <= limit) {
            arr.push(i++);
        }
        return arr;
    }

    /**
     * star mouse over event
     *
     * @param {number} v - star number
     * @docs-private
     */
    onMouseOver(v: number) {
        if (this.readonly || this.disabled) {
            return;
        }

        this._tempValue = v;
    }

    /**
     * mouse leave event
     * @docs-private
     */
    onMouseLeave() {
        this._tempValue = null;
    }

    /**
     * rating event
     *
     * @param {number} v - current rating
     * @docs-private
     */
    onClick(v: number) {
        if (this.readonly || this.disabled) {
            return;
        }

        this.value = v;
        this._tempValue = null;
        this.change.emit(this.value);
        this._updateFormModel();
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
     * @param value Value to be set to the model.
     */
    writeValue(value: any) {
        if (value) {
            this.value = Math.ceil(Number(value));
            this._cd.markForCheck();
        }
    }

    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param isDisabled Whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * update form model value and mark for check
     */
    _updateFormModel() {
        if (this._onModelChange) {
            this._onModelChange(this.value);
        }

        if (this._onTouch) {
            this._onTouch(this.value);
        }
    }

    ngAfterViewInit() {
        if (this.theme) {
            addClass(this._el.nativeElement, `nb-rating-${this.theme}`);
        }
    }
}
