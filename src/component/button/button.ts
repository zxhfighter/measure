import {
    Component, Input, ElementRef, SimpleChanges, AfterViewInit,
    OnChanges, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import { coerceBooleanProperty } from '../util/coerce';
import { ButtonConfig } from './button.config';
import { OnChange } from '../core/decorators';

/** default button theme types */
export type BUTTON_THEME = 'primary' | 'default' | 'neutral' | 'transparent' | string;

/** default button size types */
export type BUTTON_SIZE = 'xs' | 'sm' | 'default' | 'lg' | string;

/**
 * Button Component
 */
@Component({
    selector: 'button[nb-button]',
    templateUrl: './button.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        // because the button has the orignal disabled property, we can just use [disabled]
        // otherwise use [attr.disabled]
        '[disabled]': 'disabled || null'
    },
    exportAs: 'nbButton'
})
export class ButtonComponent implements OnChanges, AfterViewInit {

    /**
     * button theme, there are four default themes: 'primary' | 'default' | 'neutral' | 'transparent'
     * @default default
     */
    @Input() theme: BUTTON_THEME = 'default';

    /**
     * button size, there are four default sizes: 'xs' | 'sm' | 'default' | 'lg'
     * @default default
     */
    @Input() size: BUTTON_SIZE = 'default';

    /**
     * Whether the button is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    constructor(
        private _el: ElementRef,
        private _config: ButtonConfig
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
        const nativeEl = this._el.nativeElement;
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
            'nb-button',
            `nb-button-size-${this.size || 'default'}`,
            `nb-button-theme-${this.theme || 'default'}`
        ].join(' ');
    }
}

@Component({
    selector: 'a[nb-button]',
    templateUrl: './button.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        '[attr.tabindex]': 'disabled ? -1 : 0',

        // because <a> don't have native disabled property, we neet set [attr.disabled]
        '[attr.disabled]': 'disabled || null',
        '(click)': '_haltDisabledEvents($event)',
    },
    exportAs: 'nbButton, nbAnchor'
})
export class ButtonAnchorComponent extends ButtonComponent {

    /**
     * prevent link button default navigation event
     *
     * @param {Event} event - click event
     * @docs-private
     */
    _haltDisabledEvents(event: Event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
