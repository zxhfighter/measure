import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    Renderer2,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ElementRef,
    forwardRef
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
    encapsulation: ViewEncapsulation.None,
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
     * order dom
     * @docs-private
     */
    domOrder: string;

    /**
     * content dom
     * @docs-private
     */
    domContent: any;

    /**
     * order content
     * @docs-private
     */
    txtOrder: string = '';

    /**
     * Whether the text-line is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    constructor(
        private _cd: ChangeDetectorRef,
        private el: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnInit() {
        let objTxtOrder = this.el.nativeElement.getElementsByClassName('nb-text-line-order');
        let objTxtContent = this.el.nativeElement.getElementsByClassName('nb-text-line-content');
        let value = objTxtContent[0].value;
        value = value.replace(/\r/gi, '');
        value = value.split('\n');

        this.computeLine(value.length, objTxtOrder[0]);
    }

    /**
     * in text-line content region input string
     * @docs-private
     */
    onInputKeyup(event, txtOrder) {
        let value = event.target.value;
        value = value.replace(/\r/gi, '');
        value = value.split('\n');

        this.value = event.target.value;
        this.computeLine(value.length, txtOrder);
        this._markForCheck();
    }

    /**
     * compute text-line content how many line
     * @docs-private
     */
    computeLine(n, txtOrder) {
        for (let i = 1; i < n + 1; i++) {
            if (document.all) {
                this.txtOrder += i + '\r\n';
            } else {
                this.txtOrder += i + '\n';
            }
        }
        this._render.setProperty(txtOrder, 'value', this.txtOrder);
        this.txtOrder = '';
    }

    /**
     * listen text-line content region scroll event
     * @docs-private
     */
    scrollHandler(event, txtOrder) {
        this._render.setProperty(txtOrder, 'scrollTop', event.target.scrollTop);
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
