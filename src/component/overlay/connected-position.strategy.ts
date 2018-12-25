import { ElementRef, Injectable } from '@angular/core';
import { Point, OverlayPoint, ConnectionPosition, ConnectionPositionPair } from './position.interface';

const overlayArrowHorizontalOffset = '1.285714em';
const overlayArrowVerticalOffset = '0.7em';

export class ConnectedPositionStrategy {

    /** X-axis attachment point to be offset */
    private _offsetX: number = 0;

    /** X-axis attachment point to be offset */
    private _offsetY: number = 0;

    /** the target which overlay to be attached to */
    private _targetEl: HTMLElement;

    /** overlay element */
    private _overlayEl: HTMLElement;

    /** overlay arrow element */
    private _overlayArrowEl: HTMLElement;

    /** preferred position, include user setted the position and the oppsite of that position */
    private _preferredPositions: ConnectionPositionPair[] = [];

    /** store overlay's rect to avoid recalcuting while showing again */
    private _lastOverlayRect: ClientRect;

    /** final position */
    private _lastConnectedPosition: ConnectionPositionPair;

    constructor(
        private _targetRef: ElementRef,
        private _overlaytRef: any
    ) {
        this._targetEl = this._targetRef.nativeElement;
        this._overlayEl = this._overlaytRef.el.nativeElement;
        if (this._overlaytRef.arrow) {
            this._overlayArrowEl = this._overlaytRef.arrow.nativeElement;
        }
    }

    /**
     * set X-axis attachment point to be offset
     *
     * @param {number} offset
     * @return {object} this
     */
    withOffsetX(offset: number): this {
        this._offsetX = offset;
        return this;
    }

    /**
     * set Y-axis attachment point to be offset
     *
     * @param {number} offset
     * @return {object} this
     */
    withOffsetY(offset: number): this {
        this._offsetY = offset;
        return this;
    }

    /**
     * apply position strategy
     *
     */
    apply() {
        this.position();
    }

    /**
     * positioning
     *
     * @return {ConnectionPositionPair} fallbackPosition
     */
    position(): ConnectionPositionPair {
        const targetRect = this._targetEl.getBoundingClientRect();
        let overlayRect = this._overlayEl.getBoundingClientRect();

        if (overlayRect.width === 0
            && overlayRect.height === 0
            && typeof this._lastOverlayRect !== 'undefined') {
                overlayRect = this._lastOverlayRect;
        }

        // 获取浏览器可视区域边界
        const viewportRect = this.getViewportRect();

        // 处理边界溢出用
        let fallbackPoint: OverlayPoint | undefined;
        let fallbackPosition: ConnectionPositionPair | undefined;

        // 按用户指定的顺序优先定位元素
        for (let pos of this._preferredPositions) {
            let targetPoint = this._getTargetConnectionPoint(targetRect, pos);
            let overlayPoint = this._getOverlayPoint(targetPoint, overlayRect, viewportRect, pos);

            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(this._overlayEl, overlayPoint);
                this._calculateElementArrowPosition(this._overlayArrowEl, pos);

                // 保存当前位置，以防隐藏后无法获取真实宽高和位置
                this._lastOverlayRect = overlayRect;
                return pos;
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
                fallbackPosition = pos;
            }
        }
        // origin元素已经移出屏幕
        if (isElementScrolledOutsideView(targetRect)) {
            this._setElementPosition(this._overlayEl, fallbackPoint!);
            this._calculateElementArrowPosition(this._overlayArrowEl, fallbackPosition!);
            return fallbackPosition!;
        }

        // 这段代码有问题，先注释
        // 当所有备选方向都不能在屏幕内显示时，强行拉动。目前只在水平方向上拉动
        // const overflowLeft = overlayRect.left < 0;
        // const overflowRight = overlayRect.right > window.innerWidth;

        // if (overflowLeft || overflowRight) {
        //     const overlayPointPoint = this._pushOverlayOnScreen(fallbackPoint!, overlayRect);

        //     // 从屏幕外拉到屏幕内后还需要与源元素对齐，计算对齐所需要的位移
        //     const documentWidth = (document.documentElement || document.body).clientWidth;
        //     if (fallbackPosition!.overlayX === 'left') {
        //         this.changePositionFromLeftToRight(
        //             overlayPointPoint, fallbackPosition, documentWidth, targetRect);
        //     }
        //     else if (fallbackPosition!.overlayX === 'right') {
        //         this.changePositionFromRightToLeft(
        //             overlayPointPoint, fallbackPosition, targetRect);
        //     }
        //     else {
        //         if (overlayPointPoint.x > fallbackPoint!.x) {
        //             this.changePositionFromRightToLeft(
        //                 overlayPointPoint, fallbackPosition, targetRect);
        //         }
        //         else {
        //             this.changePositionFromLeftToRight(
        //                 overlayPointPoint, fallbackPosition, documentWidth, targetRect);
        //         }
        //     }

        //     // 设置overlay的位置
        //     this._setElementPosition(this._overlayEl, overlayPointPoint!);
        // }

        // 设置箭头的位置
        this._calculateElementArrowPosition(this._overlayArrowEl, fallbackPosition!);

        this._lastOverlayRect = overlayRect;
        return fallbackPosition!;
    }

    /**
     * push left to right at horizontaly and change the position
     *
     * @param {Point} overlayPointPoint
     * @param {ConnectionPositionPair} fallbackPosition
     * @param {Number} documentWidth
     * @param {ClientRect} targetRect
     */
    changePositionFromLeftToRight(overlayPointPoint, fallbackPosition, documentWidth, targetRect) {
        overlayPointPoint.x -= (documentWidth - targetRect.right);
        fallbackPosition!.overlayX = 'right';
        fallbackPosition!.targetX = 'right';
    }

    /**
     * push right to left at horizontaly and change the position
     *
     * @param {Point} overlayPointPoint
     * @param {ConnectionPositionPair} fallbackPosition
     * @param {Number} documentWidth
     * @param {ClientRect} targetRect
     */
    changePositionFromRightToLeft(overlayPointPoint, fallbackPosition, targetRect) {
        overlayPointPoint.x += targetRect.left;
        fallbackPosition!.overlayX = 'left';
        fallbackPosition!.targetX = 'left';
    }

    /**
     * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
     * the viewport, the top-left corner will be pushed on-screen (with overflow occuring on the
     * right and bottom).
     *
     * @param start The starting point from which the overlay is pushed.
     * @param overlay The overlay dimensions.
     * @returns The point at which to position the overlay after pushing. This is effectively a new
     *     originPoint.
     */
    private _pushOverlayOnScreen(start: Point, overlay: ClientRect): Point {
        const viewportRect = this.getViewportRect();
        const viewport = viewportRect;

        // Determine how much the overlay goes outside the viewport on each side, which we'll use to
        // decide which direction to push it.
        const overflowRight = Math.max(start.x + overlay.width - viewport.right, 0);
        const overflowBottom = Math.max(start.y + overlay.height - viewport.bottom, 0);
        // const overflowTop = Math.max(viewport.top - start.y, 0);
        const overflowTop = start.y > 0 ? 0 : Math.abs(start.y);
        const overflowLeft = Math.max(viewport.left - start.x, 0);

        // Amount by which to push the overlay in each direction such that it remains on-screen.
        let pushX, pushY = 0;

        // If the overlay fits completely within the bounds of the viewport, push it from whichever
        // direction is goes off-screen. Otherwise, push the top-left corner such that its in the
        // viewport and allow for the trailing end of the overlay to go out of bounds.
        if (overlay.width <= viewport.width) {
            pushX = overflowLeft || -overflowRight;
        } else {
            pushX = viewport.left - start.x;
        }

        if (overlay.height <= viewport.height) {
            pushY = overflowTop || -overflowBottom;
        } else {
            pushY = viewport.top - start.y;
        }

        return {
            x: start.x + pushX,
            y: start.y + pushY
        };
    }

    /**
     * get target's point according to the target's rect and position
     *
     * @param { ClientRect } targetRect
     * @param { ConnectionPositionPair } position
     * @return { Point } { x, y }
     */
    private _getTargetConnectionPoint(
        targetRect: ClientRect,
        position: ConnectionPositionPair): Point {

        const targetStartX = targetRect.left;
        const targetEndX = targetRect.right;

        let x: number;
        if (position.targetX === 'center') {
            x = targetStartX + (targetRect.width / 2);
        } else {
            x = position.targetX === 'left' ? targetStartX : targetEndX;
        }

        let y: number;
        if (position.targetY === 'center') {
            y = targetRect.top + (targetRect.height / 2);
        } else {
            y = position.targetY === 'top' ? targetRect.top : targetRect.bottom;
        }

        return { x, y };
    }

    /**
     * get overlay's point according to the overlay's rect and position
     *
     * @param { ClientRect } targetRect
     * @param { ConnectionPositionPair } position
     * @return { Point } { x, y }
     */
    private _getOverlayPoint(
        targetPoint: Point,
        overlayRect: ClientRect,
        viewportRect: ClientRect,
        position: ConnectionPositionPair): OverlayPoint {

        let overlayStartX: number;
        if (position.overlayX === 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (position.overlayX === 'left') {
            overlayStartX = 0;
        } else {
            overlayStartX = -overlayRect.width;
        }

        let overlayStartY: number;
        if (position.overlayY === 'center') {
            overlayStartY = -overlayRect.height / 2;
        } else {
            overlayStartY = position.overlayY === 'top' ? 0 : -overlayRect.height;
        }

        // The (x, y) offsets of the overlay based on the current position.
        let offsetX = typeof position.offsetX === 'undefined' ? this._offsetX : position.offsetX;
        let offsetY = typeof position.offsetY === 'undefined' ? this._offsetY : position.offsetY;

        // overlay's coordinate
        let x = targetPoint.x + overlayStartX + offsetX;
        let y = targetPoint.y + overlayStartY + offsetY;

        // How much the overlay would overflow at this position, on each side.
        let leftOverflow = 0 - x;
        let rightOverflow = (x + overlayRect.width) - viewportRect.width;
        let topOverflow = 0 - y;
        let bottomOverflow = (y + overlayRect.height) - viewportRect.height;

        // Visible parts of the element on each axis.
        let visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        let visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);

        // The area of the element that's within the viewport.
        let visibleArea = visibleWidth * visibleHeight;
        let fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;

        return { x, y, fitsInViewport, visibleArea };
    }

    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length
     *
     * @param { number } length
     * @param { number[] } ...overflows
     * @return { number }
     */
    private _subtractOverflows(length: number, ...overflows: number[]): number {

        return overflows.reduce((currentValue: number, currentOverflow: number) => {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    }

    /**
     * Physically positions the overlay element to the given coordinate
     *
     * @param { HTMLElement } element
     * @param { Point } overlayPoint
     */
    private _setElementPosition(
        element: HTMLElement,
        overlayPoint: Point) {

        let x = overlayPoint.x;
        let y = overlayPoint.y + window.pageYOffset;

        ['top', 'bottom', 'left', 'right'].forEach(p => element.style[p] = 'auto');
        element.style['top'] = `${y}px`;
        element.style['left'] = `${x}px`;
    }

    /**
     * Physically positions the overlay arrow element to the given coordinate
     *
     * @param { HTMLElement } element
     * @param { Point } overlayPoint
     */
    private _setElementArrowPosition(
        element: HTMLElement,
        arrowPosition) {

        // 当前overlay没有箭头元素
        if (!element) {
            return;
        }

        (<any>Object).keys(arrowPosition).forEach((direction) => {
            element.style[direction] = arrowPosition[direction];
        });
    }

    /**
     * Physically calculates the overlay arrow element to the given coordinate
     *
     * @param { HTMLElement } element
     * @param { Point } position
     */
    private _calculateElementArrowPosition(
        element: HTMLElement,
        position: ConnectionPositionPair) {

        // 当前overlay没有箭头元素
        if (!element) {
            return;
        }
        let arrowPosition = {
            left: 'auto',
            right: 'auto',
            top: 'auto',
            bottom: 'auto',
            transform: 'none'
        };
        if (position.overlayX === 'left') {
            if (position.overlayX === position.targetX) {
                // 两者垂直排列
                arrowPosition.left = overlayArrowHorizontalOffset;
            }
            else {
                // 两者水平排列
                arrowPosition.left = '0px';
                arrowPosition.transform = 'rotateZ(90deg)';
            }

        }
        else if (position.overlayX === 'right') {
            if (position.overlayX === position.targetX) {
                // 两者垂直排列
                arrowPosition.right = overlayArrowHorizontalOffset;
            }
            else {
                // 两者水平排列
                arrowPosition.transform = 'rotateZ(270deg)';
                arrowPosition.right = '0px';
            }
        }
        else {
            arrowPosition.left = '50%';
        }

        if (position.overlayY === 'top') {
            if (position.overlayY === position.targetY) {
                arrowPosition.top = overlayArrowVerticalOffset;
                if (position.overlayX === 'left') {
                    arrowPosition.transform = 'rotateZ(90deg)';
                }
            }
            else {
                arrowPosition.top = '0px';
                arrowPosition.transform = 'rotateZ(180deg)';
            }
        }
        else if (position.overlayY === 'bottom') {
            if (position.overlayY === position.targetY) {
                // 两者水平排列
                arrowPosition.bottom = overlayArrowVerticalOffset;
            }
            else {
                // 两者垂直排列
                arrowPosition.bottom = '0px';
            }
        }
        else {
            arrowPosition.top = '50%';
        }
        this._setElementArrowPosition(element, arrowPosition);
    }


    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    withFallbackPosition(
        originPos: ConnectionPosition,
        overlayPos: ConnectionPosition,
        offsetX?: number,
        offsetY?: number): this {

        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos, offsetX, offsetY));
        this._lastConnectedPosition = this._preferredPositions[0];
        return this;
    }

    /**
     * Gets a ClientRect for the viewport's bounds
     *
     * @return ClientRect
     */
    getViewportRect(): ClientRect {
        const doc = (document.documentElement || document.body);
        let documentRect = doc.getBoundingClientRect();
        const top = -documentRect!.top || document.body.scrollTop || window.scrollY ||
            doc.scrollTop || 0;
        const left = -documentRect!.left || document.body.scrollLeft || window.scrollX ||
            doc.scrollLeft || 0;
        const height = window.innerHeight;
        const width = window.innerWidth;

        return {
            top: top,
            left: left,
            bottom: top + height,
            right: left + width,
            height,
            width
        };
    }
}

function isElementScrolledOutsideView(element: ClientRect) {
    const outsideAbove = element.bottom < 0;
    const outsideBelow = element.top > window.innerHeight;
    const outsideLeft = element.right < 0;
    const outsideRight = element.left > window.innerWidth;

    return outsideAbove || outsideBelow || outsideLeft || outsideRight;
}

