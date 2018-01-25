import { ElementRef, Injectable } from '@angular/core';
import { ConnectedPositionStrategy } from './connected-position.strategy';
import { GlobalPositionStrategy } from './global-position.strategy';

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
        targetRef: ElementRef,
        overlayRef: ElementRef
    ): ConnectedPositionStrategy {
            return new ConnectedPositionStrategy(targetRef, overlayRef);
    }
}
