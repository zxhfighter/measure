import {
    Component, Input, Output, EventEmitter, OnInit,
    ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { SliderHandComponent } from './slider-hand';

@Component({
    selector: 'nb-slider-tracker',
    template: `<div #sliderTracker
        [style.width.%]="orientation ? selected : 100"
        [style.height.%]="orientation ? 100 : selected"
        [style.margin-left.%]="orientation ? position : ''"
        [style.bottom.%]="orientation ? '' : position"
        class="nb-slider-tracker"></div>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    exportAs: 'nbSliderTracker'
})
export class SliderTrackerComponent implements OnInit {
    @Input() selected;

    @Input() position;

    @Input() orientation;

    constructor() {}

    ngOnInit() {
    }
}
