import {
    Component, Input, Output, EventEmitter, Optional, OnInit,
    ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {coerceBooleanProperty} from '../util/coerce';
import {BoxGroupComponent} from './box-group';
import {uuid as getUUID} from '../util/uuid';
import {OnChange} from '../core/decorators';

/** box type: radio or checkbox */
export type BOX_TYPE = 'radio' | 'checkbox';

/**
 * A single checkbox or radiobox
 */
@Component({
    selector: 'nb-checkbox',
    templateUrl: './box.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-checkbox',
        '[class.nb-checkbox-disabled]': 'disabled',
        '[class.nb-checkbox-checked]': 'checked',
        '[class.nb-checkbox-intermediate]': 'intermediate',
        '[class.nb-checkbox-radio]': 'type == "radio"'
    }
})
export class InputBoxComponent implements OnInit {

    /** When the box's checked state change, emit a change event with a boolean value */
    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** box type: either 'checkbox' or 'radio' */
    @OnChange()
    @Input() type: BOX_TYPE = 'checkbox';

    /** input name, used to group radio inputs */
    @OnChange()
    @Input() uuid = getUUID();

    /** Whether the box is disabled */
    @OnChange(true)
    @Input() disabled = false;

    /** Whether the box is checked */
    @OnChange(true)
    @Input() checked = false;

    /** Whether the box is intermediate */
    @OnChange(true)
    @Input() intermediate = false;
    intermediateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** box value */
    @Input() value: any;

    /** if using within boxgroup, the parent boxgroup component */
    _parentBox: BoxGroupComponent;

    /**
     * box component constructor
     *
     * @param {BoxGroupComponent?} parentBox - find parent box group component and inject it
     * @param {ChangeDetectorRef} cd - component change detector
     */
    constructor(@Optional() parentBox: BoxGroupComponent, private cd: ChangeDetectorRef) {
        this._parentBox = parentBox;

        this.intermediateChange.subscribe(
            (v: boolean) => {
                v && (this.checked = false);
            }
        );
    }

    ngOnInit() {
        // when child onInit, it can get parent and parent binded properties
        // if using within boxgroup, set child box type and name
        if (this._parentBox) {
            this.type = (this._parentBox.type as BOX_TYPE);
            this.uuid = this._parentBox.uuid;
            this.disabled = this.disabled || this._parentBox.disabled;

            const value = (this._parentBox.value || []) as any[];
            this.checked = value.indexOf(this.value) !== -1;
        }
    }

    /**
     * input checked change event
     *
     * @param {boolean} checked - whether the input is checked
     * @param {Event} event - original change event, to prevent input default change event
     * @docs-private
     */
    onChange(checked: boolean, event: Event) {
        if (this.disabled) {
            return;
        }

        if (this._parentBox) {
            this._parentBox.select(this.value);
        }
        else {
            this.checked = checked;
            this.intermediate = false;
            this.change.emit(checked);
        }

        this.preventCheckboxDefaultEvent(event);
    }

    /**
     * Prevent default change event
     *
     * @param {Event} event - original change event, to prevent input default change event
     * @docs-private
     */
    preventCheckboxDefaultEvent(event: Event) {
        if (event.stopPropagation) {
            event.stopImmediatePropagation();
            event.stopPropagation();
        }
        else {
            event.returnValue = false;
        }
    }
}
