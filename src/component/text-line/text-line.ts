import {
    Component,
    Input,
    ChangeDetectorRef,
    Renderer2,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ElementRef,
    forwardRef,
    ViewChild
} from '@angular/core';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

import { OnChange } from '../core/decorators';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const TEXTLINE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextLineComponent),
    multi: true
};

@Component({
    selector: 'nb-text-line',
    templateUrl: './text-line.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [TEXTLINE_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-text-line',
        '[class.nb-text-line-disabled]': 'disabled'
    }
})

export class TextLineComponent implements OnInit, ControlValueAccessor {

    /**
     * text-line value
     * @default ''
     */
    @Input() value: string = '';

    /**
     * text-line placeholder
     * @default ''
     */
    @Input() placeholder: string = '';

    /**
     * Whether the text-line is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;


    /**
     * content dom
     * @docs-private
     */
    lines: any[] = [];

    @ViewChild('txtContent') txtContent: ElementRef

    constructor(
        private _cd: ChangeDetectorRef,
        private _render: Renderer2
    ) { }

    ngOnInit() {
        this.lines = this.value.replace(/\r/gi, '').split('\n').map(line => line || `\u200b${line}`);
        this._markForCheck();
    }

    /**
     * in text-line content region input string
     * @docs-private
     */
    onInput(event, txtContent, txtLines) {
        let value = event.target.value;
        this.lines = value = value.replace(/\r/gi, '').split('\n');

        this.value = event.target.value;
        this._markForCheck();

        setTimeout(() => {
            this._render.setProperty(txtContent, 'scrollTop', txtContent.scrollTop);
            this._render.setProperty(txtLines, 'scrollTop', txtContent.scrollTop);
        }, 0);
    }

    /**
     * listen text-line content region scroll event
     * @docs-private
     */
    scrollHandler(event, txtLines) {
        this._render.setProperty(txtLines, 'scrollTop', event.target.scrollTop);
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

    /** set text-line model value */
    writeValue(value: any) {
        this.value = value;
        if (value) {
            this.lines = value.replace(/\r/gi, '').split('\n');
        }
        this._cd.markForCheck();
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
