import {
    Component,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ChangeDetectionStrategy,
    OnDestroy,
    ElementRef,
    NgZone
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import {
    auditTime,
    delay
} from 'rxjs/operators';

/** default search-box theme types */
export type SEARCH_TYPE = 'ico' | 'btn' | string;

/** default search-box is not suggest search */
export type IS_SUGGESTION = 'true' | 'false';

/** Time in ms to throttle the resize|scroll events by default. */
export const DEFAULT_DELAY_TIME = 100;

/** default search-box size types */
export type SIZE = 'long' | 'default' | 'short' | string;

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const SEARCHBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchBoxComponent),
    multi: true
};

@Component({
    selector: 'nb-search-box',
    templateUrl: './search-box.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [SEARCHBOX_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-search-box',
        '[class.nb-search-box-disabled]': 'disabled',
        '[class.nb-search-box-ico]': 'type == "ico"',
        '[class.nb-search-box-btn]': 'type == "btn"',
        '(compositionstart)': '_compositionStart()',
        '(compositionend)': '_compositionEnd($event.target.value)'
    }
})

export class SearchBoxComponent implements OnInit, OnDestroy {

    /** search event */
    @Output() onSearch = new EventEmitter();

    /** clear search event */
    @Output() onClear = new EventEmitter();

    /** suggest search event */
    @Output() onSearchSuggestion = new EventEmitter();

    /**
     * search-box type: either 'ico' or 'btn'
     * @default 'ico'
     */
    @Input() type: SEARCH_TYPE = 'ico';

    /**
     * search-box size, there three default size: 'long' | 'default' | 'short'
     * @default 'default'
     */
    @Input() size: SIZE = 'default';

    /**
     * Whether the search-box is suggest search: either true or false
     * @default 'false'
     */
    @Input() isSuggestion: IS_SUGGESTION = 'false';

    /**
     * search-box default placeholder
     * @default '按关键词搜索'
     */
    @Input() placeholder: string = '按关键词搜索';

    /**
     * Whether the search-box is disabled
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * search-box mode,default 'keyup',have two mode: 'keyup','focus'.
     * @default 'keyup'
     */
    @Input() mode: string = 'keyup';

    /**
     * search-box value
     * @default ''
     */
    @Input() value: string = '';

    /**
     * search-box suggest search value
     * @default []
     */
    @Input() suggestionValue: Array<string> = [];

    /**
     * init suggest search region is not open
     * @docs-private
     */
    isOpen: boolean = false;

    /**
     * Stream of viewport change|scroll events.
     * @docs-private
     */
    _change: Observable<Event>;

    /**
     * Subscription to viewport resize|scroll events.
     * @docs-private
     */
    _resizeSubscription = Subscription.EMPTY;

    /**
     * composing value, default false
     * @docs-private
     */
    _composing = false;

    /**
     * input in search-box default size
     * @docs-private
     */
    _sizeIpt = 'default';

    /**
     * buttion in search-box default size
     * @docs-private
     */
    _sizeBtn = 'default';

    /**
     * input blur event
     * @docs-private
     */
    _inputBlur: Observable<Event>;

    /**
     * 计时器
     * @docs-private
     */
    _timer = Subscription.EMPTY;

    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(
        private _cd: ChangeDetectorRef,
        private el: ElementRef,
        private ngZone: NgZone
    ) {
        this._change = ngZone.runOutsideAngular(() => {
            return merge<Event>(fromEvent(window, 'resize'), fromEvent(window, 'scroll'));
        });
    }

    ngOnInit() {
        let self = this;
        if (this.isSuggestion !== 'false') {
            // window resize or scroll
            this._resizeSubscription = this.change().subscribe(() => this.positionSuggestionLayer(this));

            // // suggestionLayer close timeout
            let searchIpt = this.searchInput.nativeElement;
            this._inputBlur = fromEvent(searchIpt, 'blur');
            this._timer = this.blurInput().subscribe(() => this.closeSuggestionLayer(this));
        }

        switch (this.size) {
            case 'small':
                this._sizeIpt = 'short-middle';
                this._sizeBtn = 'sm';
                break;
            case 'long':
                this._sizeIpt = 'long-high';
                this._sizeBtn = 'lg';
                break;
            default:
                this._sizeIpt = 'default';
                this._sizeBtn = 'default';
        }

        this.setClass();
    }

    ngOnDestroy() {
        this._resizeSubscription.unsubscribe();
        this._timer.unsubscribe();
    }

    /**
     * set search-box class
     * @docs-private
     */
    setClass() {
        const nativeEl = this.el.nativeElement;
        nativeEl.className = this.getClassName(nativeEl.className);
    }

    /**
     * get search-box class
     * @param className
     * @docs-private
     */
    getClassName(className: string) {
        return className + ' ' + `nb-search-box-size-${this.size || 'default'}`;
    }

    /**
     * return a stream that emits whenever the input blur event happen
     * @param throttleTime
     * @docs-private
     */
    blurInput(throttleTime: number = DEFAULT_DELAY_TIME): Observable<Event> {
        return throttleTime > 0 ? this._inputBlur.pipe(delay(throttleTime)) : this._inputBlur;
    }

    /**
     * close suggestion layer
     * @param self
     * @docs-private
     */
    closeSuggestionLayer(self) {
        self.isOpen = false;
        self._cd.markForCheck();
    }

    /**
     * Returns a stream that emits whenever the size of the viewport change|scroll.
     * @param throttle Time in milliseconds to throttle the stream.
     * @docs-private
     */
    change(throttleTime: number = DEFAULT_DELAY_TIME): Observable<Event> {
        return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
    }

    /**
     * position suggestion layer
     * @docs-private
     */
    positionSuggestionLayer(self) {
        let elLayer = self.el.nativeElement.getElementsByClassName('nb-search-box-suggestion-layer');
        if (elLayer.length) {
            /**
             * 156 = 36 + 110 + 10
             * @docs-private
             */
            let pos = window.scrollY + window.innerHeight - self.el.nativeElement.offsetTop - 156 > 0
                ? 'bottom' : 'top';
            elLayer[0].className = 'nb-search-box-suggestion-layer' + ' ' + 'nb-search-box-suggestion-layer-' + pos;
        }
    }

    /**
     * 处理compositionstart事件
     * @docs-private
     */
    _compositionStart(): void {
        this._composing = true;
    }

    /**
     * 处理compositionend事件
     * @docs-private
     */
    _compositionEnd(): void {
        this._composing = false;
    }

    /**
     * listen keyword input in search-box
     * @docs-private
     */
    onInputValue() {
        if (this.isSuggestion !== 'false' && this.value && !this._composing) {
            this.fnSugguestValue();
        }
        if (!this.value) {
            this.isOpen = false;
        }
    }

    /**
     * listen enter keydown event in search-box
     * @param event
     * @docs-private
     */
    onKeydown(event) {
        if (event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            this.onSearch.emit(this.value);
            this._cd.markForCheck();
        }
    }

    /**
     * realize search-box suggest function
     * @docs-private
     */
    fnSugguestValue() {
        this.positionSuggestionLayer(this);
        this.onSearchSuggestion.emit(this.value);
        this.isOpen = true;
        this._cd.markForCheck();
    }

    /**
     * clear keyword in search-box
     * @param ipt
     * @docs-private
     */
    clearSearch(ipt) {
        this.value = '';
        ipt.placeholder = this.placeholder;
        this.onClear.emit(this.value);
        this._cd.markForCheck();
    }

    /**
     * search use keyword event
     * @docs-private
     */
    search() {
        this.onSearch.emit(this.value);
        this._markForCheck();
    }

    /**
     * click select suggest search value
     * @docs-private
     */
    selectSuggestionValue(suggestionItem: string) {
        this.value = suggestionItem;
        this.onSearch.emit(this.value);
        this._cd.markForCheck();
        this._markForCheck();
    }

    /**
     * listen focus on input event
     * @param ipt
     * @docs-private
     */
    onFocus(ipt) {
        ipt.placeholder = '';
        if (this.mode === 'focus') {
            this.fnSugguestValue();
        }
    }

    /**
     * listen blur input event
     * @param ipt
     * @docs-private
     */
    onBlur(ipt) {
        let self = this;
        if (!ipt.value) {
            ipt.placeholder = this.placeholder;
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
     * set text-line model value
     * @docs-private
     */
    writeValue(value: any) {
        this.value = value;
        this._cd.markForCheck();
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
