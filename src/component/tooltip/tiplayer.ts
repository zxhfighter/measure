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
    ChangeDetectorRef
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { ConnectionPosition, HorizontalConnectionPos, VerticalConnectionPos, ConnectionPositionPair } from './position';
import { PositionStrategy } from './position.strategy';

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
    private delay: number = 300;
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

    @Output() close: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private el: ElementRef,
        private cdRef: ChangeDetectorRef
    ) {}

    ngAfterContentInit() {
        // this.positionStrategy.apply();
    }

    updatePosition() {
        this.positionStrategy.apply();
    }

    ngAfterViewInit() {
        console.log('此时得到真实高宽，但是也是经文档流妥协过的，除非你显式指定高宽');
        console.log('先定位默认的左上角，获得真实宽高以后再apply');
        let lastConnectedPosition = this.positionStrategy.apply();
        // 非嵌入的情况下处理溢出反馈
        if (!this.embedded) {
            this.connectedPositionRevertToPlacement(lastConnectedPosition);
        }

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
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
    }

    onMouseLeave() {
        this.hide();
    }

    ngOnDestroy() {
        this.el.nativeElement.remove();
    }

    isVisible(): boolean {
        return this.visibility;
    }

    attachTo(
        targetRef: ElementRef,
        originPos: ConnectionPosition,
        overlayPos: ConnectionPosition) {
        this.positionStrategy = new PositionStrategy(targetRef, this.el, originPos, overlayPos);
        // this.positionStrategy.apply();
        this.originPos = originPos;
        this.overlayPos = overlayPos;
        const origin = this.getOrigin();
        const overlay = this.getOverlayPosition();
        this.positionStrategy.withFallbackPosition(origin.fallback, overlay.fallback);
    }

    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. 'below' -> 'above').
     */
    getOrigin(): {main: ConnectionPosition, fallback: ConnectionPosition} {
        const {x, y} = this.invertPosition(this.originPos.horizontal, this.originPos.vertical);

        return {
            main: this.originPos,
            fallback: {horizontal: x, vertical: y}
        };
    }

    /** Returns the overlay position and a fallback position based on the user's preference */
    getOverlayPosition(): {main: ConnectionPosition, fallback: ConnectionPosition} {
        const {x, y} = this.invertPosition(this.overlayPos.horizontal, this.overlayPos.vertical);

        return {
            main: this.overlayPos,
            fallback: {horizontal: x, vertical: y}
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

        return {x, y};
    }
}
