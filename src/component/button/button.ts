import {
    Component, Input, ElementRef, SimpleChanges, AfterViewInit,
    OnChanges, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {coerceBooleanProperty} from '../util/coerce';
import {ButtonConfig} from './button.config';
import {mixinDisabled, CanDisable} from '../core/mixinDisabled';

/** default button theme types */
export type BUTTON_THEME = 'primary' | 'default' | 'neutral' | 'transparent' | string;

/** default button size types */
export type BUTTON_SIZE = 'xs' | 'sm' | 'default' | 'lg' | string;

export class ButtonBase {}
export const _ButtonBase = mixinDisabled(ButtonBase);

/**
 * Button Component
 */
@Component({
    selector: 'button[x-button]',
    templateUrl: './button.html',
    styleUrls: ['./button.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    inputs: ['disabled'],
    host: {
        '[disabled]': 'disabled || null'
    },
    exportAs: 'xButton'
})
export class ButtonComponent
    extends _ButtonBase
    implements CanDisable, OnChanges, AfterViewInit {

    /** button theme, there four default themes: 'primary' | 'default' | 'neutral' | 'transparent' */
    @Input() theme: BUTTON_THEME = 'default';

    /** button size, there four default sizes: lg */
    @Input() size: BUTTON_SIZE = 'default';

    constructor(
        private el: ElementRef,
        private _config: ButtonConfig,
        private cd: ChangeDetectorRef
    ) {
        super();
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
            'x-widget',
            'x-button',
            `x-button-size-${this.size || 'default'}`,
            `x-button-theme-${this.theme || 'default'}`
        ].join(' ');
    }
}

@Component({
    selector: 'a[x-button]',
    templateUrl: './button.html',
    styleUrls: ['./button.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    inputs: ['disabled'],
    host: {
        '[attr.tabindex]': 'disabled ? -1 : 0',
        '[attr.disabled]': 'disabled || null',
        '(click)': '_haltDisabledEvents($event)',
    },
    exportAs: 'xButton, xAnchor'
})
export class ButtonAnchorComponent extends ButtonComponent {

    _haltDisabledEvents(event: Event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
