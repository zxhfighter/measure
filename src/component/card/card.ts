import {
    Component, Input, Output, EventEmitter, ContentChild, TemplateRef, AfterViewInit,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef
} from '@angular/core';

import { OnChange } from '../core/decorators';
import { addClass } from '../util/dom';

/**
 * Card Component
 */
@Component({
    selector: 'nb-card',
    templateUrl: './card.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-card'
    },
    exportAs: 'nbCard'
})
export class CardComponent implements OnInit, AfterViewInit {

    /**
     * the event emitted when the component is disposed(removed from the dom)
     */
    @Output() dispose: EventEmitter<CardComponent> = new EventEmitter<CardComponent>();

    /**
     * card width, in pixels
     * @default 540
     */
    @OnChange()
    @Input() width: number = 540;

    /**
     * @docs-private
     */
    widthChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * whether the card can be disposed
     * @default false
     */
    @OnChange(true)
    @Input() disposable: boolean = false;

    /**
     * the card extra theme, i.e. when theme is 'dialog', an extra class `nb-card-dialog`
     * will be appended to the host className property
     * @default ''
     */
    @Input() theme: string = '';

    @ContentChild('title', {static: false}) _title: TemplateRef<any>;
    @ContentChild('operation', {static: false}) _operation: TemplateRef<any>;
    @ContentChild('body', {static: false}) _body: TemplateRef<any>;
    @ContentChild('foot', {static: false}) _foot: TemplateRef<any>;

    constructor(private _el: ElementRef, private _render: Renderer2) {
        this.registerWidthChange();
    }

    /**
     * @docs-private
     */
    registerWidthChange() {
        const widthChange = (width: number) => {
            if (width) {
                this._render.setStyle(this._el.nativeElement, 'width', `${width}px`);
            }
        };
        this.widthChange.subscribe(widthChange);
    }

    ngOnInit() { }

    /**
     * @docs-private
     */
    onDispose() {
        this.dispose.emit(this);

        const el = this._el.nativeElement as HTMLElement;
        const parentNode = el.parentNode;
        this._render.removeChild(parentNode, el);
    }

    ngAfterViewInit() {
        if (this.theme) {
            addClass(this._el.nativeElement, `nb-card-${this.theme}`);
        }
    }
}
