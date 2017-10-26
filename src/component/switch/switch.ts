import {
    Component, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChanges,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, OnChanges,
    ChangeDetectorRef
} from '@angular/core';

import {coerceBooleanProperty} from '../util/coerce';

@Component({
    selector: 'x-switch',
    templateUrl: './switch.html',
    styleUrls: ['./switch.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'x-widget x-switch'
    }
})
export class SwitchComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() checked = false;

    private _disabled = false;
    @Input() get disabled() {
        return this._disabled;
    }

    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }

    @Input() styleClass = '';

    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();


    @ViewChild('checkbox') checkbox: ElementRef;

    constructor(private el: ElementRef, private cd: ChangeDetectorRef) {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['checked']) {
            this.checked = changes['checked'].currentValue;
            this.cd.markForCheck();
        }

        if (changes['disabled']) {
            this.disabled = changes['disabled'].currentValue;
            this.cd.markForCheck();
        }
    }

    ngAfterViewInit() {
        const nativeEl = this.el.nativeElement;
        const className = nativeEl.className;

        if (this.styleClass) {
            nativeEl.className = className + ' ' + this.styleClass;
        }
    }

    onChange(checked: boolean) {
        if (this.disabled) {
            return;
        }

        this.checked = checked;
        this.change.emit(checked);
    }
}
