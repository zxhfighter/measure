import {
    Injector,
    Injectable,
    TemplateRef,
    ViewRef,
    ElementRef,
    EmbeddedViewRef,
    ViewContainerRef,
    Renderer2,
    NgZone,
    ComponentRef,
    ComponentFactory,
    ComponentFactoryResolver
} from '@angular/core';
import { ConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos, ConnectionPositionPair } from './position';
import { PositionStrategy } from '../util/position.strategy';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { auditTime } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

/** Time in ms to throttle the resize events by default. */
export const DEFAULT_RESIZE_TIME = 20;

export class ContentRef {
    constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) { }
}

export class OverlayPositionService {
    private overlayComponent: any;
    private _contentRef: ContentRef | null;
    private positionStrategy: PositionStrategy;
    private originElement: ElementRef;
    originPos: ConnectionPosition;
    overlayPos: ConnectionPosition;
    placement: string;
    firstPlacement: string;
    seconedPlacement: string;

    /** Subscription to viewport resize events. */
    _resizeSubscription = Subscription.EMPTY;

    /** Stream of viewport change events. */
    _change: Observable<Event>;

    constructor(
        overlayRef: any,
        ngZone: NgZone
    ) {
        this._change = ngZone.runOutsideAngular(() => {
            return merge<Event>(fromEvent(window, 'resize'), fromEvent(window.document, 'scroll'));
        });
        this.overlayComponent = overlayRef;
    }

    /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * @param throttle Time in milliseconds to throttle the stream.
     */
    change(throttleTime: number = DEFAULT_RESIZE_TIME): Observable<Event> {
        return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
    }

    attachTo(
        targetRef: ElementRef,
        originPos: ConnectionPosition,
        overlayPos: ConnectionPosition) {

        this.positionStrategy = new PositionStrategy(targetRef, this.overlayComponent.el, originPos, overlayPos);
        this.originPos = originPos;
        this.overlayPos = overlayPos;
        const origin = this.getOrigin();
        const overlay = this.getOverlay();
        this.positionStrategy.withFallbackPosition(origin.fallback, overlay.fallback);
        this._resizeSubscription.unsubscribe();
        this._resizeSubscription = this.change().subscribe(() => this.updatePosition());
    }

    updatePosition() {
        this.positionStrategy.apply(this.positionChangeHandler());
    }

    positionChangeHandler() {
        return (lastConnectedPosition: ConnectionPositionPair) => {
            // 非嵌入的情况下处理溢出反馈
            if (!this.overlayComponent.embedded) {
                this.connectedPositionRevertToPlacement(lastConnectedPosition);
            }
        };
    }

    connectedPositionRevertToPlacement(lastConnectedPosition: ConnectionPositionPair) {
        // 相异的方向为主方向
        if (lastConnectedPosition.targetX !== lastConnectedPosition.overlayX) {
            this.overlayComponent.placement = lastConnectedPosition.targetX + '-' + lastConnectedPosition.targetY;
        }
        else if (lastConnectedPosition.targetY !== lastConnectedPosition.overlayY) {
            this.overlayComponent.placement = lastConnectedPosition.targetY + '-' + lastConnectedPosition.targetX;
        }
    }

    getOriginPosition(placement: string): ConnectionPosition {
        let [firstPlacement, seconedPlacement] = placement.split('-');
        let horizontal;
        let vertical;
        if (firstPlacement === 'top' || firstPlacement === 'bottom') {
            vertical = firstPlacement;
        }

        if (firstPlacement === 'left') {
            horizontal = 'left';
        }

        if (firstPlacement === 'right') {
            horizontal = 'right';
        }

        if (seconedPlacement === 'left') {
            horizontal = 'left';
        }

        if (seconedPlacement === 'right') {
            horizontal = 'right';
        }

        if (seconedPlacement === 'top' || seconedPlacement === 'bottom') {
            vertical = seconedPlacement;
        }

        if (seconedPlacement == null) {
            if (firstPlacement === 'top' || firstPlacement === 'bottom') {
                horizontal = 'center';
            }
            else {
                vertical = 'center';
            }
        }

        if (typeof horizontal === 'undefined' || typeof vertical === 'undefined') {
            throw this.getInvalidplacementError(placement);
        }

        return {
            horizontal: horizontal,
            vertical: vertical
        };
    }

    getInvalidplacementError(position: string) {
        return Error(`Tooltip position "${position}" is invalid.`);
    }

    getOverlayPosition(placement: string): ConnectionPosition {
        let [firstPlacement, seconedPlacement] = placement.split('-');
        let horizontal;
        let vertical;
        if (firstPlacement === 'top') {
            vertical = 'bottom';
        }
        if (firstPlacement === 'bottom') {
            vertical = 'top';
        }

        if (firstPlacement === 'left') {
            horizontal = 'right';
        }

        if (firstPlacement === 'right') {
            horizontal = 'left';
        }

        if (seconedPlacement === 'left') {
            horizontal = 'left';
        }

        if (seconedPlacement === 'right') {
            horizontal = 'right';
        }

        if (seconedPlacement === 'top' || seconedPlacement === 'bottom') {
            vertical = seconedPlacement;
        }

        if (seconedPlacement == null) {
            if (firstPlacement === 'top' || firstPlacement === 'bottom') {
                horizontal = 'center';
            }
            else {
                vertical = 'center';
            }
        }

        if (typeof horizontal === 'undefined' || typeof vertical === 'undefined') {
            throw this.getInvalidplacementError(placement);
        }

        return {
            horizontal: horizontal,
            vertical: vertical
        };
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
    getOverlay(): { main: ConnectionPosition, fallback: ConnectionPosition } {
        const { x, y } = this.invertPosition(this.overlayPos.horizontal, this.overlayPos.vertical);

        return {
            main: this.overlayPos,
            fallback: { horizontal: x, vertical: y }
        };
    }

    /** Inverts an overlay position. */
    invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
        if (this.overlayComponent.firstPlacement === 'top' || this.overlayComponent.firstPlacement === 'bottom') {
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
