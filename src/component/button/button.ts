import {
    Component, Input, ElementRef, SimpleChanges, AfterViewInit,
    OnChanges, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {ButtonConfig} from './button.config';

/** default button theme types */
export type BUTTON_THEME = 'primary' | 'default' | 'neutral' | 'transparent' | string;

/** default button size types */
export type BUTTON_SIZE = 'xs' | 'sm' | 'default' | 'lg' | string;

/**
 * Button Component
 */
@Component({
    selector: 'button[x-button], a[x-button]',
    templateUrl: './button.html',
    styleUrls: ['./button.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'attr.disabled': 'this.disabled || null'
    },
    exportAs: 'XButton'
})
export class ButtonComponent implements OnChanges, AfterViewInit {

    /** button theme, there four default themes: 'primary' | 'default' | 'neutral' | 'transparent' */
    @Input() theme: BUTTON_THEME = 'default';

    /** button size, there four default sizes: lg */
    @Input() size: BUTTON_SIZE = 'default';

    /** button disabled state */
    @Input() disabled = false;

    constructor(private el: ElementRef, private _config: ButtonConfig) {
        Object.assign(this, _config);
    }

    ngOnChanges(changes: SimpleChanges) {
        // refresh class list
        if (changes['theme'] || changes['size']) {
            this.setClass();
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
