import { ElementRef, Injectable } from '@angular/core';
import { Point, OverlayPoint, ConnectionPosition, ConnectionPositionPair } from './position.interface';

export class ConnectedPositionStrategy {

    /** X-axis attachment point to be offset */
    private _offsetX: number = 0;

    /** X-axis attachment point to be offset */
    private _offsetY: number = 0;

    /** the target which overlay to be attached to */
    private _targetEl: HTMLElement;

    /** overlay element */
    private _overlayEl: HTMLElement;

    /** preferred position, include user setted the position and the oppsite of that position */
    private _preferredPositions: ConnectionPositionPair[] = [];

    /** store overlay's rect to avoid recalcuting while showing again */
    private _lastOverlayRect: ClientRect;

    /** final position */
    private _lastConnectedPosition: ConnectionPositionPair;

    constructor(
        private _targetRef: ElementRef,
        private _overlaytRef: ElementRef
    ) {
        this._targetEl = this._targetRef.nativeElement;
        this._overlayEl = this._overlaytRef.nativeElement;
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
     * @param {Function} callback
     * @return {lastConnectedPosition} lastConnectedPosition
     */
    apply(callback: Function) {
        let lastConnectedPosition = this.position();

        // 定位改变后执行回调函数 - 重新设置定位属性以渲染页面
        if (lastConnectedPosition !== this._lastConnectedPosition
            && typeof callback === 'function'
        ) {
            this._lastConnectedPosition = lastConnectedPosition;
            callback(lastConnectedPosition);
        }

        return lastConnectedPosition;
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

                // 保存当前位置，以防隐藏后无法获取真实宽高和位置
                this._lastOverlayRect = overlayRect;
                return pos;
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
                fallbackPosition = pos;
            }
        }

        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(this._overlayEl, fallbackPoint!);
        this._lastOverlayRect = overlayRect;

        return fallbackPosition!;
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
        return this;
    }

    /**
     * Gets a ClientRect for the viewport's bounds
     *
     * @return ClientRect
     */
    getViewportRect(): ClientRect {
        let documentRect = document.documentElement.getBoundingClientRect();
        const top = -documentRect!.top || document.body.scrollTop || window.scrollY ||
            document.documentElement.scrollTop || 0;
        const left = -documentRect!.left || document.body.scrollLeft || window.scrollX ||
            document.documentElement.scrollLeft || 0;
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
