import {
    Component, Input, Output, EventEmitter, ContentChildren, QueryList, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, ViewChildren, AfterViewChecked, ChangeDetectorRef
} from '@angular/core';

import {CheckboxComponent} from './checkbox';

import {coerceBooleanProperty} from '../util/coerce';

@Component({
    selector: 'x-boxgroup',
    templateUrl: './box-group.html',
    styleUrls: ['./box-group.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'x-widget x-boxgroup',
        '[class.x-boxgroup-disabled]': 'disabled'
    }
})
export class BoxGroupComponent implements OnInit, AfterViewInit {
    name = 'xxx';
    @ContentChildren(forwardRef(() => CheckboxComponent)) _boxList: QueryList<CheckboxComponent>;

    private _type: 'checkbox'|'radio' = 'checkbox';
    @Input() get type() {return this._type};
    set type(value: any) {

        console.log('parent input binding');
        this._type = value;

        if (this._boxList) {
            this._boxList.forEach(item => {
                item.type = this._type;
                item.uuid =  this._uuid;
            });
        }
    }

    private _disabled: boolean = false;
    @Input() get disabled() {return this._disabled};
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);

        if (this._boxList) {
            this._boxList.forEach(item => {
                item.disabled = this._disabled;
            });
        }
    }

    private _value: any;
    @Input() get value() {return this._value};
    set value(value: any) {
        this._value = value;
    }

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    _uuid = Math.random().toString(16).slice(2, 8);

    constructor(private cd: ChangeDetectorRef) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        // setTimeout(() => {
        //     if (this._boxList) {
        //         this._boxList.forEach(item => {
        //             item.type = this.type;
        //             item.uuid =  this._uuid;
        //         });
        //     }
        // }, 100);
    }

    select(value: any) {
        if (this.type === 'radio') {
            this._boxList.forEach(item => {
                item.checked = item.value === value;
            });
            this.value = [value];
            this.change.emit(this.value);

        }
        else if (this.type === 'checkbox') {
            const button = this._boxList.find(v => v.value === value);
            const valueSet = new Set(this.value);
            if (button) {
                button.checked = !button.checked;
                button.checked ? valueSet.add(value) : valueSet.delete(value);
                this.value = Array.from(valueSet);
                this.change.emit(this.value);
            }
        }

        this.cd.markForCheck();
    }
}
