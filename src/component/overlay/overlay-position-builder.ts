import { ElementRef, Injectable } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ConnectedPositionStrategy } from '../util/connected-position.strategy';
import { GlobalPositionStrategy } from '../util/global-position.strategy';
import { OverlayComponent } from './overlay';
import { ConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos, ConnectionPositionPair } from '../util/position';

/** Builder for overlay position strategy. */
@Injectable()
export class OverlayPositionBuilder {
    constructor() { }

    /**
     * Creates a global position strategy.
     */
    global(): GlobalPositionStrategy {
        return new GlobalPositionStrategy();
    }

    /**
     * Creates a relative position strategy.
     * @param elementRef
     * @param originPos
     * @param overlayPos
     */
    attachTo(
        // targetRef: ElementRef,
        // overlayComponent: OverlayComponent,
        // originPos: ConnectionPosition,
        // overlayPos: ConnectionPosition
    ): void {
            // return new PositionStrategy(targetRef, overlayComponent.el, originPos, overlayPos);
    }
}
