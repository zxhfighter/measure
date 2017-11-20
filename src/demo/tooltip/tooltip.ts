import {
    Component, Output, EventEmitter,  OnInit, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList, ContentChildren, ContentChild
} from '@angular/core';
import { TiplayerComponent } from '../../component/tooltip/tiplayer';
import { TooltipDirective } from '../../component/tooltip/tooltip';

@Component({
    selector: 'demo-tooltip',
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTooltip implements OnInit {

    @ViewChild('genuineOrigin') tooltip: TooltipDirective;

    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {

    }

    ngOnInit() {

    }

    onIknowthat() {
        this.close.emit();
    }

    showIsolateTip() {
        const isVisible = this.tooltip.isTooltipVisible();
        if (!isVisible) {
            this.tooltip.open();
        }
    }
}
