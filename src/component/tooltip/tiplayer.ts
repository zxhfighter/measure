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
    OnChanges,
    OnDestroy,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, filter, map, tap, auditTime } from 'rxjs/operators';
import { OnChange } from '../core/decorators';
import { ConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos, ConnectionPositionPair } from './position';
import { PositionStrategy } from './position.strategy';

/** Time in ms to throttle the resize events by default. */
export const DEFAULT_RESIZE_TIME = 20;

@Component({
    selector: 'nb-tiplayer',
    templateUrl: './tiplayer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nbTiplayer',
    host: {
        'class': 'nb-widget',
        '(mouseenter)': 'this.onMouseEnter()',
        '(mouseleave)': 'this.onMouseLeave()'
    }
})

export class TiplayerComponent implements AfterContentInit, AfterViewInit, OnDestroy {

    private _title: string;
    private _content: string | TemplateRef<any>;
    private visibility: boolean = true;
    private positionStrategy: PositionStrategy;
    private delay: number = 200;
    /** The timeout ID of any current timer set to show the tooltip */
    _showTimeoutId: number;

    /** The timeout ID of any current timer set to hide the tooltip */
    _hideTimeoutId: number;

    _placement: string;

    hasArrow: boolean;
    embedded: boolean;
    originPos: ConnectionPosition;
    overlayPos: ConnectionPosition;

    firstPlacement: string;
    @Input() set placement(data) {
        this._placement = data;
        this.firstPlacement = this._placement.split('-')[0];
    }

    get placement(): string {
        return this._placement;
    }

    @Input() set title(data) {
        this._title = data;
    }

    get title(): string {
        return this._title;
    }

    @Input() set content(data) {
        this._content = data;
    }

    get content(): string | TemplateRef<any> {
        return this._content;
    }

    @Input() nbTooltipTheme: string;

    @Input() trigger: string;

    @Output() close: EventEmitter<number> = new EventEmitter<number>();

    /** Stream of viewport change events. */
    _change: Observable<Event>;

    /** Subscription to viewport resize events. */
    _resizeSubscription = Subscription.EMPTY;

    constructor(
        private el: ElementRef,
        private cdRef: ChangeDetectorRef,
        ngZone: NgZone
    ) {
        this._change = ngZone.runOutsideAngular(() => {
            return fromEvent(window, 'resize');
        });
    }

    /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * @param throttle Time in milliseconds to throttle the stream.
     */
    change(throttleTime: number = DEFAULT_RESIZE_TIME): Observable<Event> {
        return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
    }

    ngAfterContentInit() {
        // this.positionStrategy.apply();
    }

    updatePosition() {
        this.positionStrategy.apply(this.positionChangeHandler());
    }

    ngAfterViewInit() {
        this.positionStrategy.apply(this.positionChangeHandler());
    }
    positionChangeHandler() {
        return (lastConnectedPosition: ConnectionPositionPair) => {
            // 非嵌入的情况下处理溢出反馈
            if (!this.embedded) {
                this.connectedPositionRevertToPlacement(lastConnectedPosition);
            }
        };
    }

    connectedPositionRevertToPlacement(lastConnectedPosition: ConnectionPositionPair) {
        // 相异的方向为主方向
        if (lastConnectedPosition.targetX !== lastConnectedPosition.overlayX) {
            this.placement = lastConnectedPosition.targetX + '-' + lastConnectedPosition.targetY;
        }
        else if (lastConnectedPosition.targetY !== lastConnectedPosition.overlayY) {
            this.placement = lastConnectedPosition.targetY + '-' + lastConnectedPosition.targetX;
        }
    }

    show() {
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        this._showTimeoutId = window.setTimeout(() => {
            this.visibility = true;
            this.cdRef.markForCheck();
        }, this.delay);
    }

    hide() {
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }

        this._hideTimeoutId = window.setTimeout(() => {
            this.visibility = false;
            this.cdRef.markForCheck();
        }, this.delay);
    }

    onMouseEnter() {
        if (this.trigger !== 'hover') {
            return;
        }
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
    }

    onMouseLeave() {
        if (this.trigger !== 'hover') {
            return;
        }
        this.hide();
    }

    ngOnDestroy() {
        this.el.nativeElement.remove();
        this._resizeSubscription.unsubscribe();
    }

    detach() {
        this._resizeSubscription.unsubscribe();
    }

    isVisible(): boolean {
        return this.visibility;
    }

    attachTo(
        targetRef: ElementRef,
        originPos: ConnectionPosition,
        overlayPos: ConnectionPosition) {
        this.positionStrategy = new PositionStrategy(targetRef, this.el, originPos, overlayPos);
        this.originPos = originPos;
        this.overlayPos = overlayPos;
        const origin = this.getOrigin();
        const overlay = this.getOverlayPosition();
        this.positionStrategy.withFallbackPosition(origin.fallback, overlay.fallback);
        this._resizeSubscription.unsubscribe();
        this._resizeSubscription = this.change().subscribe(() => this.updatePosition());
    }

    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. 'below' -> 'above').
     */
    getOrigin(): { main: ConnectionPosition, fallback: ConnectionPosition } {
        const { x, y } = this.invertPosition(this.originPos.horizontal, this.originPos.vertical);

        return {
            main: this.originPos,
            fallback: { horizontal: x, vertical: y }
        };
    }

    /** Returns the overlay position and a fallback position based on the user's preference */
    getOverlayPosition(): { main: ConnectionPosition, fallback: ConnectionPosition } {
        const { x, y } = this.invertPosition(this.overlayPos.horizontal, this.overlayPos.vertical);

        return {
            main: this.overlayPos,
            fallback: { horizontal: x, vertical: y }
        };
    }

    /** Inverts an overlay position. */
    invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
        if (this.firstPlacement === 'top' || this.firstPlacement === 'bottom') {
            if (y === 'top') {
                y = 'bottom';
            } else if (y === 'bottom') {
                y = 'top';
            }
        } else {
            if (x === 'right') {
                x = 'left';
            } else if (x === 'left') {
                x = 'right';
            }
        }

        return { x, y };
    }
}
