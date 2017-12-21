import {
    NgModule,
    Input,
    Component,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterContentInit,
    AfterViewInit,
    ElementRef,
    TemplateRef,
    Injector,
    ComponentFactoryResolver,
    ViewContainerRef,
    OnDestroy,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    NgZone,
    Renderer2
} from '@angular/core';
import { Placement } from '../util/position';

import { ViewportRuler } from './scroll-strategy';
import { OverlayPositionService } from './overlay-position.service';
import { OverlayOriginDirective } from './overlay-origin.directive';
// import { OverlayPositionBuilder } from './overlay-position-builder';


@Component({
    selector: 'nb-overlay',
    templateUrl: './overlay.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [ViewportRuler, OverlayPositionService],
    host: {
        'class': 'nb-widget',
        '(click)': '_preventDefault($event)'
    },
    exportAs: 'nbOverlay'
})
export class OverlayComponent implements AfterViewInit, OnDestroy {

    /** the event emitted when the overlay is hide */
    @Output() onHide: EventEmitter<OverlayComponent> = new EventEmitter<OverlayComponent>();

    @Input() origin: OverlayOriginDirective;

    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     */
    @Input() container: string = 'body';

    @Input() placement: Placement = 'bottom-left';

    visibility: boolean = false;

    private _delay: number = 0;
    /** The timeout ID of any current timer set to show the tooltip */
    private _showTimeoutId: number;
    /** The timeout ID of any current timer set to hide the tooltip */
    private _hideTimeoutId: number;

    /** document click listener, when click on other area, hide the overlay */
    private _documentClickListener: Function | null;

    constructor(
        private el: ElementRef,
        private cdRef: ChangeDetectorRef,
        private render: Renderer2,
        private overlayPositionService: OverlayPositionService
    ) {

        // when click on other area, hide the overlay
        this._documentClickListener = this.render.listen('document', 'click', () => {
            this.visibility = false;
            this.cdRef.markForCheck();
        });
    }

    ngOnDestroy() {
        this.el.nativeElement.remove();

        // remove document click listener
        if (this._documentClickListener) {
            this._documentClickListener();
            this._documentClickListener = null;
        }
    }

    ngAfterViewInit() {
        if (this.container === 'body') {
            window.document.querySelector(this.container)!.appendChild(this.el.nativeElement);
        }
        if (this.origin) {
            const positionStategy = this.overlayPositionService
                .attachTo(this.origin.elementRef, this, this.placement)

            this.overlayPositionService.updatePosition(positionStategy);
        }
    }

    show() {
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        this._showTimeoutId = window.setTimeout(() => {
            this.visibility = true;
            this.cdRef.markForCheck();
        }, this._delay);
    }

    hide() {
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }

        this._hideTimeoutId = window.setTimeout(() => {
            this.visibility = false;
            this.onHide.emit(this);
            this.cdRef.markForCheck();
        }, this._delay);
    }

    isVisible(): boolean {
        return this.visibility;
    }

    _preventDefault(event: MouseEvent) {
        event.stopPropagation();
    }
}
