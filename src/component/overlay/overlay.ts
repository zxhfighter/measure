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
    Injector,
    ComponentFactoryResolver,
    ViewContainerRef,
    OnDestroy,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    NgZone,
    Renderer2
} from '@angular/core';
import { Placement } from '../util/position';
import { OnChange } from '../core/decorators';
import { ViewportRuler } from './scroll-strategy';
import { OverlayPositionService } from './overlay-position.service';
import { OverlayOriginDirective } from './overlay-origin.directive';

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

    /** the event emitted when the overlay is hide */
    @Output() onHide: EventEmitter<OverlayComponent> = new EventEmitter<OverlayComponent>();

    @Input() origin: OverlayOriginDirective;

    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     */
    @Input() container: string = 'body';

    @Input() placement: Placement = 'bottom-left';

    visibility: boolean = false;

    @Input() delay: number = 0;
    /** The timeout ID of any current timer set to show the tooltip */
    _showTimeoutId: number;
    /** The timeout ID of any current timer set to hide the tooltip */
    _hideTimeoutId: number;

    /** document click listener, when click on other area, hide the overlay */
    private _documentClickListener: Function | null;

    private positionStategy: any;

    constructor(
        public el: ElementRef,
        private render: Renderer2,
        public cdRef: ChangeDetectorRef,
        private overlayPositionService: OverlayPositionService
    ) {
    }

    ngOnInit() {
        // when click on other area, hide the overlay
        this._documentClickListener = this.render.listen('document', 'click', () => {
            if (this.visibility) {
                this.visibility = false;
                this.onHide.emit(this);
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
            const positionStategy = this.overlayPositionService
                .attachTo(this.origin.elementRef, this, this.placement);

            this.positionStategy = positionStategy;
            // 调用show方法和组件渲染完成在不同场景下的执行顺序不同，所以两处都需要重新定位。
            // 此处定位一是因为渲染完成能够获得真实宽高，此时定位更为准确。
            // 二是因为当show方法执行早于此方法时，show方法中并没有定位。比如Tooltip的hover场景。
            // 原因二不成立，Tooltip覆盖了此方法
            // this.overlayPositionService.updatePosition(positionStategy);
        }
    }

    show() {
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        this._showTimeoutId = window.setTimeout(() => {
            // TODO positionStategy应该在更早的时机赋值 此处就不需要判断了
            // 调用show方法和组件渲染完成在不同场景下的执行顺序不同，所以两处都需要重新定位。
            // 此处定位是因为渲染完成后计算的位置可能并不准确，比如overlay渲染完成早于overlay上方的DOM或组件渲染完成。
            if (this.positionStategy) {
                this.overlayPositionService.updatePosition(this.positionStategy);
            }
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
            this.onHide.emit(this);
            this.cdRef.markForCheck();
        }, this.delay);
    }

    isVisible(): boolean {
        return this.visibility;
    }

    _preventDefault(event: MouseEvent) {
        event.stopPropagation();
    }
}
