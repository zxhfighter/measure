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
    ChangeDetectorRef
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { ConnectionPosition } from './position';
import { PositionStrategy } from './position.strategy';

@Component({
    selector: 'nb-tiplayer',
    templateUrl: './tiplayer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nbTiplayer',
    host: {
        'class': 'nb-widget'
    }
})

export class TiplayerComponent implements AfterContentInit, AfterViewInit, OnChanges {

    private _title: string;
    private _content: string | TemplateRef<any>;
    private visibility: boolean = true;
    private positionStrategy: PositionStrategy;
    _placement: string;
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

    constructor(
        private el: ElementRef,
        private cdRef: ChangeDetectorRef
    ) { }

    ngAfterContentInit() {
        this.positionStrategy.apply();
    }

    ngAfterViewInit() {
        console.log('此时得到真实高宽，但是也是经文档流妥协过的，除非你显式指定高宽');
        console.log('先定位默认的左上角，获得真实宽高以后再apply');
        this.positionStrategy.apply();
    }

    show() {
        setTimeout(() => {
            this.visibility = true;
            this.cdRef.markForCheck();
        }, 0);
    }

    hide() {
        setTimeout(() => {
            this.visibility = false;
            this.cdRef.markForCheck();
        }, 0);
    }

    isVisible(): boolean {
        return this.visibility;
    }

    attachTo(
        targetRef: ElementRef,
        originPos: ConnectionPosition,
        overlayPos: ConnectionPosition) {
        this.positionStrategy = new PositionStrategy(targetRef, this.el, originPos, overlayPos)
        this.positionStrategy.apply();
    }
}