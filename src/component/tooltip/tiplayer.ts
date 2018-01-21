import {
    NgModule,
    Input,
    Component,
    OnInit,
    OnChanges,
    ViewChild,
    SimpleChanges,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterContentInit,
    AfterViewInit,
    ContentChild,
    AfterContentChecked,
    ElementRef,
    TemplateRef,
    OnDestroy,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    NgZone,
    trigger
} from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { OverlayComponent } from '../overlay';
import { Placement } from '../util/position';

@Component({
    selector: 'nb-tiplayer',
    templateUrl: './tiplayer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [ fadeAnimation ],
    exportAs: 'nbTiplayer',
    host: {
        'class': 'nb-widget nb-tiplayer',
        '[class.invisible]': '!visibility',
        '[class.nb-tiplayer-embedded]': 'embedded',
        '(mouseenter)': 'this.onMouseEnter()',
        '(mouseleave)': 'this.onMouseLeave()',
        '(click)': '_preventDefault($event)',
    }
})

export class TiplayerComponent extends OverlayComponent implements AfterViewInit, OnDestroy {

    /**
     * 提示框宽度
     */
    @Input() nbWidth: number;

    /**
     * 提示框高度
     */
    @Input() nbHeight: number;

    @Input() nbTooltipTheme: string;

    @Input() trigger: string;

    @Input() hasArrow: boolean;

    @Input() embedded: boolean;

    @Input()
    get placement () {
        return this._placement;
    }
    set placement(data) {
        this._placement = data;
        this.firstPlacement = this._placement.split('-')[0];
    }

    @Input() delay: number = 200;

    @Output() needReposition: EventEmitter<Object> = new EventEmitter();

    @ViewChild('content') content: ElementRef;

    _placement: Placement;

    visibility: boolean = true;

    firstPlacement: string;

    ngAfterViewInit() {
        this.needReposition.emit();
    }

    changeContent(content) {
        this.content.nativeElement.innerHTML = content;
    }

    onMouseEnter() {
        if (this.trigger !== 'hover') {
            return;
        }
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
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

    _preventDefault(event: MouseEvent) {
        event.stopPropagation();
    }
}
