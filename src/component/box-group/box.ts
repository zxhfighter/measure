import {
    Component, Input, Output, EventEmitter, Optional, OnInit, ViewEncapsulation,
    ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {coerceBooleanProperty} from '../util/coerce';
import {BoxGroupComponent} from './box-group';

/**
 * A single checkbox or radiobox
 */
@Component({
    selector: 'x-checkbox',
    templateUrl: './box.html',
    styleUrls: ['./box-group.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'x-widget x-checkbox',
        '[class.x-checkbox-disabled]': 'disabled',
        '[class.x-checkbox-checked]': 'checked',
        '[class.x-checkbox-radio]': 'type == "radio"'
    }
})
export class InputBoxComponent implements OnInit {

    /** When the box's checked state change, emit a change event */
    @Output() check: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** box type: checkbox or radio */
    private _type: 'checkbox'|'radio' = 'checkbox';
    @Input() get type() {return this._type;}
    set type(value: any) {
        if (value) {
            this._type = value;
            this.cd.markForCheck();
        }
    }

    /** input name, used to group radio inputs */
    private _uuid: string = Math.random().toString(16).slice(2, 8);
    @Input() get uuid() {return this._uuid;}
    set uuid(value: any) {
        this._uuid = value;
        this.cd.markForCheck();
    }

    /** disabled state */
    private _disabled = false;
    @Input() get disabled() {return this._disabled;}
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }

    /** Whether the box is checked */
    @Input() checked = false;

    /** box value */
    @Input() value: any;

    /** if using within boxgroup, the parent boxgroup component */
    _parentBox: BoxGroupComponent;

    constructor(@Optional() parentBox: BoxGroupComponent, private cd: ChangeDetectorRef ) {
        this._parentBox = parentBox;
    }

    ngOnInit() {
        // if using within boxgroup, set child box type and name
        if (this._parentBox) {
            this.type = this._parentBox.type;
            this.uuid = this._parentBox._uuid;
        }
    }

    onChange(checked: boolean, event: Event) {
        if (this.disabled) {
            return;
        }

        if (this._parentBox) {
            this._parentBox.select(this.value);
        }
        else {
            this.checked = checked;
            this.check.emit(checked);
        }

        this.cd.markForCheck();

        event.stopImmediatePropagation();
        event.stopPropagation();
    }
}
