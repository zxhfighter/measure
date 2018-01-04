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
        '[class.nb-tiplayer-embedded]': 'embedded',
        '(mouseenter)': 'this.onMouseEnter()',
        '(mouseleave)': 'this.onMouseLeave()'
    }
})

// export class TiplayerComponent implements AfterViewInit, OnDestroy {
export class TiplayerComponent extends OverlayComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() nbTooltipTheme: string;

    @Input() trigger: string;

    @Input() hasArrow: boolean;

    @Input() embedded: boolean;

    @Output() needReposition: EventEmitter<Object> = new EventEmitter();

    @Input()
    get placement () {
        return this._placement;
    }
    set placement(data) {
        this._placement = data;
        this.firstPlacement = this._placement.split('-')[0];
    }

    @Input() delay: number = 200;

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
