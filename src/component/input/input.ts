import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy,
    ElementRef, SimpleChanges, AfterViewInit, OnChanges, ChangeDetectorRef
} from '@angular/core';

import {coerceBooleanProperty} from '../util/coerce';
import {InputConfig} from './input.config';
import {OnChange} from '../core/decorators';

/** default input theme types */
export type INPUT_THEME = 'default' | 'error' | string;

/** default input size types */
export type INPUT_SIZE = 
'long-high' | 'long-middle' | 'long-low' | 'default' | 'short-high' | 'short-middle' | 'short-low' | string;

@Component({
    selector: '[nb-input]',
    templateUrl: './input.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        '[disabled]': 'disabled || null'
    },
    exportAs: 'xInput'
})
export class InputComponent implements OnChanges, AfterViewInit {
    
    /** input theme, there four default themes: 'default' */
    @Input() theme: INPUT_THEME = 'default';

    /** input size, there four default size: 'default' */
    @Input() size: INPUT_SIZE = 'default';

    /** Whether the input is disabled */
    @OnChange(true)
    @Input() disabled = false;

    constructor(
        private el: ElementRef,
        private _config: InputConfig,
        private cd: ChangeDetectorRef
    ) {
        Object.assign(this, _config);
    }

    ngOnChanges(changes: SimpleChanges) {
        // refresh class list
        if (changes['theme'] || changes['size']) {
            this.setClass();
        }

        if (changes['disabled']) {
            this.disabled = coerceBooleanProperty(changes['disabled'].currentValue);
        }
    }

    ngAfterViewInit() {
        // init class list
        this.setClass();
    }

    /**
     * set host element classes
     * @docs-private
     */
    setClass() {
        const nativeEl = this.el.nativeElement;
        nativeEl.className = this.getClassName();
    }

    /**
     * get host element classes, depends on the theme and size.
     * @return {string} class names
     * @docs-private
     */
    getClassName() {
        return [
            'nb-widget',
            'nb-input',
            `nb-input-size-${this.size || 'default'}`,
            `nb-input-theme-${this.theme || 'default'}`
        ].join(' ');
    }
}
