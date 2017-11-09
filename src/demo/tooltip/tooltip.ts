import {
    Component, Output, EventEmitter,  OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-tooltip',
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTooltip implements OnInit {

    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {

    }

    ngOnInit() {

    }

    onIknowthat() {
        this.close.emit();
    }
}
