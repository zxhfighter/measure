import {
    Component, Input, Output, EventEmitter, ViewChild, forwardRef, Renderer2,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import {SelectConfig, OptionsStyles} from './select.config';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'nb-select',
    templateUrl: './select.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-select'
    },
    exportAs: 'xSelect',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true
    }]
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @ViewChild('button') button;
    @Input() datasource: SelectConfig[] = [];
    @Input() defaultLabel: string;
    @Output() onChange: EventEmitter<SelectConfig> = new EventEmitter();
    @Output() onPanelShow: EventEmitter<Object> = new EventEmitter();
    @Output() onPanelHide: EventEmitter<Object> = new EventEmitter();

    protected value: number;
    protected expanded: boolean = false;
    protected icon: string = 'fa-angle-down';
    protected selectedData: SelectConfig;
    protected styles: OptionsStyles;
    protected windowResizeListener: Function;
    protected documentClickListener: Function;
    protected onModelChange: Function = () => {};
    protected onModelTouched: Function = () => {};

    constructor(protected renderer: Renderer2,
                protected cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.selectedData = {value: null, label: this.defaultLabel || '请选择'};
    }

    onToggle(e) {
        e.stopPropagation();

        this.changeState();
        if (this.expanded) {
            this.setOptionsStyle();
            this.bindEvents();
        }
    }

    changeState() {
        this.expanded = !this.expanded;
        this.icon = this.expanded ? 'fa-angle-up' : 'fa-angle-down';
        this.cd.markForCheck();

        if (!this.expanded) {
            this.unbindDocumentClickListener();
        }
    }

    onSelectedOption(data: SelectConfig) {
        this.selectedData = data;
        this.value = this.selectedData.value;
        this.onChange.emit({
            value: this.selectedData.value,
            label: this.selectedData.label
        });
        this.onModelChange(this.selectedData);
        this.changeState();
        this.onModelTouched();
        this.setSelectedData();
        this.cd.markForCheck();
    }

    bindEvents() {
        if (!this.windowResizeListener) {
            this.windowResizeListener = this.renderer.listen('window', 'resize', () => this.setOptionsStyle());
        }

        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                this.changeState();
            });
        }
    }

    unbindEvents() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }

        this.unbindDocumentClickListener();
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    setOptionsStyle() {
        this.styles = this.getComputedStyle();
        this.cd.markForCheck();
    }

    setSelectedData() {
        this.datasource.forEach((data) => {
            if (data.value === this.value) {
                this.selectedData = data;
                this.cd.markForCheck();
            }
        });
    }

    getComputedStyle() {
        let styles: OptionsStyles = {};
        let btnElement: HTMLElement = this.button.el.nativeElement;
        let winInnerHeight: number = window.innerHeight;
        let btnHeight: number = btnElement.offsetHeight;
        let offsetTop: number = this._getTop(btnElement);
        let offsetBottom: number = winInnerHeight - offsetTop - btnHeight;

        styles.left = btnElement.offsetLeft + 'px';
        if (offsetTop < offsetBottom + (btnHeight * 3)) {
            styles.top = btnHeight + 'px';
        }
        else {
            styles.bottom = btnHeight + 'px';
        }

        return styles;
    }

    writeValue(value: number) {
        if (value === null) {
            return;
        }

        this.value = value;
        this.setSelectedData();
    }

    registerOnChange(fn: Function) {
        this.onModelChange = fn;
        this.cd.markForCheck();
    }

    registerOnTouched(fn: Function) {
        this.onModelTouched = fn;
        this.cd.markForCheck();
    }

    ngOnDestroy() {
        this.unbindEvents();
    }

    protected _getTop(ele): number {
        let offset = ele.offsetTop;

        if (ele.offsetParent !== null) {
            offset += this._getTop(ele.offsetParent);
        }

        return offset;
    }
}
