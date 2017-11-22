import {
    Point,
    OverlayPoint,
    ConnectionPosition,
    ConnectionPositionPair
} from './position';
import { ElementRef } from '@angular/core';

export class PositionStrategy {

    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _targetEl: HTMLElement;
    private _overlayEl: HTMLElement;
    private _preferredPositions: ConnectionPositionPair[] = [];
    private _lastOverlayRect: ClientRect;
    private _lastConnectedPosition: ConnectionPositionPair;

    constructor(
        private _targetRef: ElementRef,
        private _overlaytRef: ElementRef,
        private _targetPos: ConnectionPosition,
        private _overlayPos: ConnectionPosition) {
        this._targetEl = this._targetRef.nativeElement;
        this._overlayEl = this._overlaytRef.nativeElement.children[0];
        this.withFallbackPosition(_targetPos, _overlayPos);
        this._lastConnectedPosition = this.withFallbackPosition[0];
    }

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

    private _getTargetConnectionPoint(targetRect: ClientRect, pos: ConnectionPositionPair): Point {
        const targetStartX = targetRect.left;
        const targetEndX = targetRect.right;

        let x: number;
        if (pos.targetX === 'center') {
            x = targetStartX + (targetRect.width / 2);
        } else {
            x = pos.targetX === 'left' ? targetStartX : targetEndX;
        }

        let y: number;
        if (pos.targetY === 'center') {
            y = targetRect.top + (targetRect.height / 2);
        } else {
            y = pos.targetY === 'top' ? targetRect.top : targetRect.bottom;
        }

        return { x, y };
    }

    private _getOverlayPoint(
        targetPoint: Point,
        overlayRect: ClientRect,
        viewportRect: ClientRect,
        pos: ConnectionPositionPair): OverlayPoint {

        let overlayStartX: number;
        if (pos.overlayX === 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'left') {
            overlayStartX = 0;
        } else {
            overlayStartX = -overlayRect.width;
        }

        let overlayStartY: number;
        if (pos.overlayY === 'center') {
            overlayStartY = -overlayRect.height / 2;
        } else {
            overlayStartY = pos.overlayY === 'top' ? 0 : -overlayRect.height;
        }

        // overlay的坐标
        let x = targetPoint.x + overlayStartX + this._offsetX;
        let y = targetPoint.y + overlayStartY + this._offsetY;

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

    private _subtractOverflows(length: number, ...overflows: number[]): number {
        return overflows.reduce((currentValue: number, currentOverflow: number) => {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    }

    private _setElementPosition(
        element: HTMLElement,
        overlayPoint: Point) {

        let x = overlayPoint.x;
        let y = overlayPoint.y + window.pageYOffset;

        ['top', 'bottom', 'left', 'right'].forEach(p => element.style[p] = 'auto');
        element.style['top'] = `${y}px`;
        element.style['left'] = `${x}px`;
    }

    withFallbackPosition(
        originPos: ConnectionPosition,
        overlayPos: ConnectionPosition): this {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    }

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