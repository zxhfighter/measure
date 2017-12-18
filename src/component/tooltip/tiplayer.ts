/**
 *
 * 作为overlay的内容组件要注意两个问题：
 * - [已废弃]构造函数constructor中要声明el属性，用于overlay.service.ts中将当前内容append到body中
 * - 需要重新定位的时候，将needReposition事件emit出去
 */
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
    OnDestroy,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';

@Component({
    selector: 'nb-tiplayer',
    templateUrl: './tiplayer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nbTiplayer',
    host: {
        '(mouseenter)': 'this.onMouseEnter()',
        '(mouseleave)': 'this.onMouseLeave()'
    }
})

export class TiplayerComponent implements AfterViewInit, OnDestroy {

    @Input() content: string | TemplateRef<any>;

    @Input() nbTooltipTheme: string;

    @Input() trigger: string;

    @Input() hasArrow: boolean;

    @Input() embedded: boolean;

    visibility: boolean = true;

    firstPlacement: string;

    private _placement: string;

    placementChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() set placement(data) {
        this._placement = data;
        this.firstPlacement = this._placement.split('-')[0];
        this.placementChange.emit(this._placement);
    }

    get placement () {
        return this._placement;
    }

    @Output() needReposition: EventEmitter<Object> = new EventEmitter();

    private _delay: number = 200;
    /** The timeout ID of any current timer set to show the tooltip */
    private _showTimeoutId: number;
    /** The timeout ID of any current timer set to hide the tooltip */
    private _hideTimeoutId: number;

    constructor(
        private el: ElementRef,
        private cdRef: ChangeDetectorRef
    ) {
    }

    ngAfterViewInit() {
        // this.placementChange.subscribe((placement) => {
        //     if (placement.split('-')[0] === 'left') {
        //         this.positionStrategy.withOffsetX(-10);
        //     }
        //     else if (placement.split('-')[0] === 'right') {
        //         this.positionStrategy.withOffsetX(10);
        //     }
        // });

        this.needReposition.emit();
    }

    show() {
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        this._showTimeoutId = window.setTimeout(() => {
            this.visibility = true;
            this.cdRef.markForCheck();
        }, this._delay);
    }

    hide() {
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }

        this._hideTimeoutId = window.setTimeout(() => {
            this.visibility = false;
            this.cdRef.markForCheck();
        }, this._delay);
    }

    onMouseEnter() {
        if (this.trigger !== 'hover') {
            return;
        }
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
    }

    onMouseLeave() {
        if (this.trigger !== 'hover') {
            return;
        }
        this.hide();
    }

    ngOnDestroy() {
        this.el.nativeElement.remove();
    }

    isVisible(): boolean {
        return this.visibility;
    }
}
