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
    Renderer2,
    Injector,
    ComponentFactoryResolver,
    ViewContainerRef,
    OnDestroy,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';
import { OverlayPositionService } from './overlay-position.service';
import { ConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos, ConnectionPositionPair } from '../util/position';
import { PositionStrategy } from '../util/position.strategy';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { auditTime } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

@Component({
    selector: 'nb-overlay',
    templateUrl: './overlay.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget'
    },
    exportAs: 'nbOverlay'
})
export class OverlayComponent implements OnInit, AfterContentInit, OnDestroy {

    @Input() origin: any;

    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     */
    @Input() container: string = 'body';

    @Input() set placement(data) {
        this._placement = data;
        this.firstPlacement = this._placement.split('-')[0];
        this.seconedPlacement = this._placement.split('-')[1];
    }

    get placement () {
        return this._placement;
    }

    firstPlacement: string;
    seconedPlacement: string;
    originPos: ConnectionPosition;
    overlayPos: ConnectionPosition;
    visibility: boolean = false;

    private _delay: number = 0;
    /** The timeout ID of any current timer set to show the tooltip */
    private _showTimeoutId: number;
    /** The timeout ID of any current timer set to hide the tooltip */
    private _hideTimeoutId: number;

    private overlayPositionService: OverlayPositionService;

    private _placement: string;

    private positionStrategy: PositionStrategy;

    constructor(
        private el: ElementRef,
        private cdRef: ChangeDetectorRef,
        ngZone: NgZone
    ) {
        this.overlayPositionService = new OverlayPositionService(this, ngZone);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.el.nativeElement.remove();
    }

    ngAfterContentInit() {
        if (this.container === 'body') {
            window.document.querySelector(this.container)!.appendChild(this.el.nativeElement);
        }
        let originPos = this.overlayPositionService.getOriginPosition(this.placement);
        let overlayPos = this.overlayPositionService.getOverlayPosition(this.placement);
        this.overlayPositionService.attachTo(this.origin.el, originPos, overlayPos);
        this.overlayPositionService.updatePosition();
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
            this.cdRef.markForCheck();
        }, this._delay);
    }

    isVisible(): boolean {
        return this.visibility;
    }
}
