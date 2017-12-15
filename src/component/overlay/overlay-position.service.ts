import {
    Injector,
    Injectable,
    TemplateRef,
    ViewRef,
    ElementRef,
    EmbeddedViewRef,
    ViewContainerRef,
    ComponentRef,
    ComponentFactory,
    ComponentFactoryResolver
} from '@angular/core';
import { Placement, ConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos, ConnectionPositionPair } from '../util/position';
import { PositionStrategy } from '../util/connected-position.strategy';
import { OverlayPositionBuilder } from './overlay-position-builder';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { auditTime } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { ViewportRuler } from './scroll-strategy';
import { OverlayComponent } from './overlay';

export class ContentRef {
    constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) { }
}

@Injectable()
export class OverlayPositionService {
    private overlayComponent: any;
    private _contentRef: ContentRef | null;
    private positionStrategy: PositionStrategy;
    private originElement: ElementRef;
    originPos: ConnectionPosition;
    overlayPos: ConnectionPosition;
    placement: Placement;
    firstPlacement: string;
    seconedPlacement: string;

    /** Subscription to viewport resize events. */
    _resizeSubscription = Subscription.EMPTY;

    constructor(
        private _viewportRuler: ViewportRuler,
        private _overlayPositionBuilder: OverlayPositionBuilder
    ) {
    }

    position(): OverlayPositionBuilder {
        return this._overlayPositionBuilder;
    }

    setOverlayRef(overlayRef) {
        this.overlayComponent = overlayRef;
        return this;
    }

    attachTo(
        targetRef: ElementRef,
        placement: Placement) {

        this.splitPlacement(placement);
        this.originPos = this.getOriginPosition();
        this.overlayPos = this.getOverlayPosition();
        this.positionStrategy = new PositionStrategy(targetRef, this.overlayComponent.el, this.originPos, this.overlayPos);
        const origin = this.getOrigin();
        const overlay = this.getOverlay();
        this.positionStrategy.withFallbackPosition(origin.fallback, overlay.fallback);
        this._resizeSubscription.unsubscribe();
        this._resizeSubscription = this._viewportRuler.change().subscribe(() => this.reposition());
        return this;
    }

    splitPlacement(placement: Placement) {
        this.placement = placement;
        let [firstPlacement, seconedPlacement] = this.placement.split('-');
        this.firstPlacement = firstPlacement;
        this.seconedPlacement = seconedPlacement;
    }

    updatePosition() {
        this.positionStrategy.apply(this.positionChangeHandler());
    }

    reposition() {
        this.updatePosition();
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

    getOriginPosition(): ConnectionPosition {

        let horizontal;
        let vertical;
        const firstPlacement = this.firstPlacement;
        const seconedPlacement = this.seconedPlacement;
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
            throw this.getInvalidplacementError(this.placement);
        }

        return {
            horizontal: horizontal,
            vertical: vertical
        };
    }

    getInvalidplacementError(position: string) {
        return Error(`Tooltip position "${position}" is invalid.`);
    }

    getOverlayPosition(): ConnectionPosition {
        const firstPlacement = this.firstPlacement;
        const seconedPlacement = this.seconedPlacement;
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
            throw this.getInvalidplacementError(this.placement);
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

// export function OVERLYA_POSITION_SERVICE_FACTORY(
//     viewportRuler: ViewportRuler) {
//     return new OverlayPositionService(viewportRuler);
// }

// /** @docs-private */
// export const OVERLYA_POSITION_SERVICE_PROVIDER = {
// // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
// provide: OverlayPositionService,
// deps: [ViewportRuler],
// useFactory: OVERLYA_POSITION_SERVICE_FACTORY
// };
