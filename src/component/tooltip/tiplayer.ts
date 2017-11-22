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
        // 'class': 'nb-widget',
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

    @Input() set placement(data) {
        this._placement = data;
        this.firstPlacement = this._placement.split('-')[0];
    }

    get placement () {
        return this._placement;
    }

    @Output() afterViewInit: EventEmitter<Object> = new EventEmitter();

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
        this.afterViewInit.emit();
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
