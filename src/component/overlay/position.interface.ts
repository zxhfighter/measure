/** Horizontal dimension of a connection point on the perimeter of the origin or overlay element. */
export type HorizontalConnectionPos = 'left' | 'center' | 'right';

/** Vertical dimension of a connection point on the perimeter of the origin or overlay element. */
export type VerticalConnectionPos = 'top' | 'center' | 'bottom';

/** all case of Placement*/
export type Placement = 'top' | 'bottom' | 'left' | 'right' |
    'top-left' | 'top-right' |
    'bottom-left' | 'bottom-right' |
    'left-top' | 'left-bottom' |
    'right-top' | 'right-bottom';

/*
 * A connection point on the overlay element or origin element.
 */
export interface ConnectionPosition {
    horizontal: HorizontalConnectionPos;
    vertical: VerticalConnectionPos;
}

/*
 * The points of the origin element and the overlay element to connect.
 */
export class ConnectionPositionPair {
    /** X-axis attachment point for connected overlay origin. Can be 'left', 'center', or 'right'. */
    targetX: HorizontalConnectionPos;
    /** Y-axis attachment point for connected overlay origin. Can be 'top', 'center', or 'bottom'. */
    targetY: VerticalConnectionPos;
    /** X-axis attachment point for connected overlay. Can be 'left', 'center', or 'right'. */
    overlayX: HorizontalConnectionPos;
    /** Y-axis attachment point for connected overlay. Can be 'top', 'center', or 'bottom'. */
    overlayY: VerticalConnectionPos;

    constructor(
        target: ConnectionPosition,
        overlay: ConnectionPosition,
        public offsetX?: number,
        public offsetY?: number) {

        this.targetX = target.horizontal;
        this.targetY = target.vertical;
        this.overlayX = overlay.horizontal;
        this.overlayY = overlay.vertical;
    }
}

/**
 * A simple (x, y) coordinate
 */
export interface Point {
    x: number;
    y: number;
}

/**
 * Expands the simple (x, y) coordinate by adding info about whether the
 * element would fit inside the viewport at that position, as well as
 * how much of the element would be visible.
 */
export interface OverlayPoint extends Point {
    visibleArea: number;
    fitsInViewport: boolean;
}
