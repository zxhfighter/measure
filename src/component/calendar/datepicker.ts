import {
    Component, Input, Output, EventEmitter, Renderer2, OnDestroy, ViewChild, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {Moment} from 'moment';
import * as moment from 'moment';
import {Element} from 'glob-stream';

import {OnChange} from '../core/decorators';


/**
 * DatePicker Component
 */
@Component({
    selector: 'nb-datepicker',
    templateUrl: './datepicker.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-datepicker',
        '(click)': 'onClickDatePicker($event)'
    }
})
export class DatePickerComponent implements OnInit, OnDestroy {

    /** datepicker change event */
    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    /**
     * selected date
     */
    @Input() value: Date = new Date();

    /** whether the datepicker is disabled */
    @OnChange(true)
    @Input()
    disabled: boolean = false;

    /**
     * show text in input box
     * @readonly
     * @docs-private
     */
    get valueText() {
        return moment(this.value).format('YYYY-MM-DD');
    }

    /** whether the panel is show */
    _showPanel: boolean = false;

    /** document click listener */
    _documentClickListener: any;

    @ViewChild('input') _input: ElementRef;
    @ViewChild('panel') _panel: ElementRef;

    constructor(private render: Renderer2, private cd: ChangeDetectorRef, private el: ElementRef) {

        // listen document click
        this._documentClickListener = this.render.listen('document', 'click', () => {
            this._showPanel = false;
            // this.cd.markForCheck();
        });
    }

    ngOnInit() {}

    ngOnDestroy() {

        // remove global document click listener
        if (this._documentClickListener) {
            this._documentClickListener();
        }
    }

    onShowCalendar() {
        this._showPanel = true;
        this._setPanelPosition();
    }

    onHideCalendar() {
        this._showPanel = false;
    }

    onSelectDate(date: Date) {
        this.value = date;
        this.change.emit(this.value);
        this._showPanel = false;
    }

    _setPanelPosition() {
        try {
            const panel = this._panel.nativeElement as HTMLElement;
            const windowHeight = window.innerHeight;
            const rect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();

            this.render.setStyle(panel, 'opacity', 0);
            setTimeout(() => {
                const panelRec = panel.getBoundingClientRect();
                const up = rect.top > windowHeight / 2;
                this.render.setStyle(panel, 'top', (up ? -panelRec.height : 38) + 'px');
                this.render.setStyle(panel, 'opacity', 1);
            }, 100)
        }
        catch(e) {
            throw new Error('it only works in browser');
        }
    }

    /**
     * stop propagation, when click host, don't close panel
     * @param {MouseEvent} event - mouse event
     * @docs-private
     */
    onClickDatePicker(event: MouseEvent) {

        event.stopPropagation();
        event.stopImmediatePropagation();
    }
}
