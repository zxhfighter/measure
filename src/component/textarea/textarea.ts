import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy,
    ElementRef, SimpleChanges, AfterViewInit, OnChanges, ChangeDetectorRef
} from '@angular/core';

import { coerceBooleanProperty } from '../util/coerce';
import { TextareaConfig } from './textarea.config';
import { OnChange } from '../core/decorators';

/** default textarea theme types */
export type TEXTAREA_THEME = 'default' | 'error' | string;

@Component({
    selector: 'textarea[nb-textarea]',
    templateUrl: './textarea.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        '[disabled]': 'disabled || null'
    },
    exportAs: 'nb-Textarea'
})
export class TextareaComponent implements OnChanges, AfterViewInit {

    /** 
     * textarea theme, there two default themes: 'default' | 'error'
     * @default default
     */
    @Input() theme: TEXTAREA_THEME = 'default';

    /** 
     * Whether the textarea is disabled 
     * @default false
     */
    @OnChange(true)
    @Input() disabled = false;

    constructor(
        private el: ElementRef,
        private _config: TextareaConfig,
        private cd: ChangeDetectorRef
    ) {
        Object.assign(this, _config);
    }

    ngOnChanges(changes: SimpleChanges) {
        // refresh class list
        if (changes['theme']) {
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
     * get host element classes, depends on the theme.
     * @return {string} class names
     * @docs-private
     */
    getClassName() {
        return [
            'nb-widget',
            'nb-textarea',
            `nb-textarea-theme-${this.theme || 'default'}`
        ].join(' ');
    }
}
