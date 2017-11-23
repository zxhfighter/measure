/**
 *
 * 作为overlay的内容组件要注意两个问题：
 * - 构造函数constructor中要声明el属性，用于overlay.service.ts中将当前内容append到body中
 * - 需要重新定位的时候，将needReposition事件emit出去
 */
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
export class SelectOptionsComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
    @Input() data: SelectConfig[] = [];
    @Input() datasource: SelectConfig[] = [];
    @Input() value: number;
    @Input() styles: SelectConfig[] = [];
    @Output() onChange: EventEmitter<SelectConfig> = new EventEmitter();
    @Output() needReposition: EventEmitter<Object> = new EventEmitter();

    visibility: boolean = false;

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

    ngAfterViewInit() {
        this.needReposition.emit();
    }

    render() {
        this.datasource = this.data;
        this.cd.markForCheck();
    }

    show() {
        this.visibility = true;
        this.cd.markForCheck();
        setTimeout(() => {
            this.needReposition.emit();
        });
    }

    hide() {
        this.visibility = false;
        this.cd.markForCheck();
    }

    onSelectOption(e: Event, data: SelectConfig) {
        e.stopPropagation();
        this.onChange.emit(data);
    }

    ngOnDestroy() {
        this.el.nativeElement.remove();
    }
}
