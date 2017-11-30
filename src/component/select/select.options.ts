import {
    Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewChecked,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, AfterViewInit
} from '@angular/core';
import { SelectConfig, OptionsStyles } from './select.config';

@Component({
    selector: 'nb-select-options',
    templateUrl: './select.options.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class SelectOptionsComponent implements OnInit, AfterViewChecked {
    @Input() data: SelectConfig[] = [];
    @Input() datasource: SelectConfig[] = [];
    @Input() value: number;
    @Input() styles: SelectConfig[] = [];
    @Output() onChange: EventEmitter<SelectConfig> = new EventEmitter();
    @Output() needReposition: EventEmitter<Object> = new EventEmitter();

    constructor(
        protected cd: ChangeDetectorRef,
        protected el: ElementRef
    ) {
    }

    ngOnInit() {
        this.render();
    }

    ngAfterViewChecked() {
        this.render();
    }

    render() {
        this.datasource = this.data;
        this.cd.markForCheck();
    }

    onSelectOption(e: Event, data: SelectConfig) {
        e.stopPropagation();
        this.onChange.emit(data);
    }
}
