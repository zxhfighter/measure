import {
    Component, Input, Output, EventEmitter, Optional,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {coerceBooleanProperty} from '../util/coerce';

import {BoxGroupComponent} from './box-group';

@Component({
    selector: 'x-checkbox',
    template: `
        <label class="x-checkbox-label">
            <input
                #checkbox
                name="{{uuid}}"
                type="{{type}}"
                class="visually-hidden"
                [checked]="checked"
                [disabled]="disabled"
                (change)="onChange(checkbox.checked)">

            <ng-content></ng-content>
        </label>
    `,
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
export class CheckboxComponent implements OnInit {
    name = 'jjj';
    // @Input() type: 'checkbox'|'radio' = 'checkbox';

    private _type: 'checkbox'|'radio' = 'checkbox';
    @Input() get type() {return this._type;}
    set type(value: any) {
        if (value) {
            this._type = value;
            this.cd.markForCheck();
        }
    }

    private _uuid: string = Math.random().toString(16).slice(2, 8);

    @Input() get uuid() {
        return this._uuid;
    }
    set uuid(value: any) {
        this._uuid = value;
        this.cd.markForCheck();
    }

    @Input() checked = false;
    private _disabled = false;

    @Input() get disabled() {
        return this._disabled;
    }

    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }

    @Input() value: any;

    // _uuid = Math.random().toString(16).slice(2, 8);

    _parentBox: BoxGroupComponent;

    constructor(@Optional() parentBox: BoxGroupComponent, private cd: ChangeDetectorRef) {

        console.log('child constructor');

        this._parentBox = parentBox;

        if (this._parentBox) {
            console.log('parent type is: ', this._parentBox.type);
        }
    }

    ngOnInit() {
        if (this._parentBox) {
            this.type = this._parentBox.type;
            this.uuid = this._parentBox._uuid;
        }
    }

    onChange(checked: boolean) {

        if (this.disabled) {
            return;
        }

        // this.checked = checked;

        this._parentBox.select(this.value);
        this.cd.markForCheck();
    }
}
