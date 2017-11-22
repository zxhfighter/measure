import {
    Component, Input, Output, EventEmitter, ViewChild, forwardRef, Renderer2, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef,
    ViewContainerRef, Injector, NgZone, ComponentFactoryResolver, TemplateRef
} from '@angular/core';
import {SelectConfig, OptionsStyles} from './select.config';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { SelectOptionsComponent } from './select.options';
import { OverlayService } from '../util/overlay.service';
import { Placement } from '../util/position';

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
    @ViewChild('overlay') overlay: SelectOptionsComponent;
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
    protected overlayInstance: SelectOptionsComponent | null;
    protected overlayService: OverlayService<SelectOptionsComponent>;

    placement: Placement = 'bottom-left';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
        private ngZone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver,
        private cd: ChangeDetectorRef) {

        this.overlayService = new OverlayService<SelectOptionsComponent>(
            SelectOptionsComponent,
            injector,
            viewContainerRef,
            renderer,
            componentFactoryResolver,
            ngZone);
    }

    ngOnInit() {
        this.selectedData = {value: null, label: this.defaultLabel || '请选择'};
    }

    onToggle(e) {
        e.stopPropagation();

        this.changeState();
        if (this.expanded) {
            this.bindEvents();
        }
    }

    show() {
        if (!this.overlayInstance) {
            this.createOverlay();
        }
        this.overlayInstance!.show();
    }

    hide() {
        if (this.overlayInstance) {
            this.overlayInstance.hide();
        }
    }

    toggleOverlay() {
        this.isOverlayVisible() ? this.hide() : this.show();
    }

    isOverlayVisible(): boolean {
        return !!this.overlayInstance && this.overlayInstance.visibility;
    }

    createOverlay() {
        this.overlayInstance = this.overlayService.createOverlayFromExistingComponent(
            this.overlay, this.button.el, this.placement, true);
    }

    changeState() {
        this.toggleOverlay();

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

    setSelectedData() {
        this.datasource.forEach((data) => {
            if (data.value === this.value) {
                this.selectedData = data;
                this.cd.markForCheck();
            }
        });
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
}
