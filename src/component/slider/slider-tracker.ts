import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

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
export class SliderTrackerComponent {

    /**
     * tracker selected
     */
    @Input() selected;

    /**
     * tracker position
     */
    @Input() position;

    /**
     * slider orientation
     */
    @Input() orientation;

}
