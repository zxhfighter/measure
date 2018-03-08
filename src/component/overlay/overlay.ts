import { Input, Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy,
    AfterViewInit, ElementRef, OnDestroy, Output, EventEmitter, ChangeDetectorRef, Renderer2
} from '@angular/core';
import { Placement } from './position.interface';
import { OnChange } from '../core/decorators';
import { ViewportRuler } from './scroll-strategy';
import { OverlayPositionService } from './overlay-position.service';
import { OverlayOriginDirective } from './overlay-origin.directive';
import { TooltipDirective } from '../tooltip/tooltip';

@Component({
    selector: 'nb-overlay',
    templateUrl: './overlay.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-overlay',
        '[class.invisible]': '!visibility',
        '(click)': '_preventDefault($event)'
    },
    exportAs: 'nbOverlay'
})
export class OverlayComponent implements OnInit, AfterViewInit, OnDestroy {

    /** the event of opening the overlay */
    @Output() openHandler: EventEmitter<OverlayComponent> = new EventEmitter<OverlayComponent>();

    /** the event of closing the overlay */
    @Output() closeHandler: EventEmitter<OverlayComponent> = new EventEmitter<OverlayComponent>();

    /** * attached origin element */
    @Input() origin: OverlayOriginDirective | TooltipDirective;

    /** A selector specifying the element the popover should be appended to. */
    /** Currently only supports "body".*/
    @Input() container: string = 'body';

    /** overlay element's original position such as 'bottom-top' */
    @Input() placement: Placement = 'bottom-left';

    /** the delay of changing visibility */
    @Input() delay: number = 0;

    /** overlay state about visibility */
    visibility: boolean = false;

    /** The timeout ID of any current timer set to show the tooltip */
    showTimeoutId: number;

    /** The timeout ID of any current timer set to hide the tooltip */
    hideTimeoutId: number;

    /** document click listener, when click on other area, hide the overlay */
    private _documentClickListener: Function | null;

    /** A strategy for positioning overlays */
    private _positionStategy: any;

    constructor(
        public el: ElementRef,
        public cdRef: ChangeDetectorRef,
        private render: Renderer2,
        private overlayPositionService: OverlayPositionService
    ) {
    }

    ngOnInit() {
        // when click on other area, hide the overlay
        this._documentClickListener = this.render.listen('document', 'click', () => {
            if (this.visibility) {
                this.visibility = false;
                this.closeHandler.emit(this);
                this.cdRef.markForCheck();
            }
        });
    }

    ngOnDestroy() {
        this.el.nativeElement.remove();

        // remove document click listener
        if (this._documentClickListener) {
            this._documentClickListener();
            this._documentClickListener = null;
        }
    }

    ngAfterViewInit() {
        if (this.container === 'body') {
            window.document.querySelector(this.container)!.appendChild(this.el.nativeElement);
        }
        if (this.origin) {
            this._positionStategy = this.overlayPositionService
                .attachTo(this.origin.el, this, this.placement);
        }
        // 调用show方法和组件渲染完成在不同场景下的执行顺序不同，所以两处都需要重新定位。
        // 此处定位一是因为渲染完成能够获得真实宽高，此时定位更为准确。
        // 二是因为当show方法执行早于此方法时，show方法中并没有定位。比如Tooltip的hover场景。
        this.overlayPositionService.updatePosition(this._positionStategy);
    }

    /**
     * position the overlay element and show it
     */
    show() {
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
        }
        this.showTimeoutId = window.setTimeout(() => {
            // 调用show方法和组件渲染完成在不同场景下的执行顺序不同，所以两处都需要重新定位。
            // 此处定位是因为渲染完成后计算的位置可能并不准确，比如overlay渲染完成早于overlay上方的DOM或组件渲染完成。
            if (this._positionStategy) {
                this.overlayPositionService.updatePosition(this._positionStategy);
            }
            this.visibility = true;
            this.openHandler.emit(this);
            this.cdRef.markForCheck();
        }, this.delay);
    }

    /**
     * hide the overlay element
     */
    hide() {
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
        }

        this.hideTimeoutId = window.setTimeout(() => {
            this.visibility = false;
            this.closeHandler.emit(this);
            this.cdRef.markForCheck();
        }, this.delay);
    }

    /**
     * check the visibility of the overlay
     * @param { boolean } this.visibility
     */
    isVisible(): boolean {
        return this.visibility;
    }

    /**
     * prevent default when click the overlay itself
     * @param { MouseEvent } event
     */
    _preventDefault(event: MouseEvent) {
        event.stopPropagation();
    }
}
