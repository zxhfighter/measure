import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {describeArc, polarToCartesian} from '../util/svg';
import {OnChange} from '../core/decorators';

/**
 * Circle progress bar
 */
@Component({
    selector: 'nb-progress-bar-circle',
    templateUrl: './progress-bar-circle.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-progress-bar-circle',
        '[class.success]': 'isSuccess',
        '[class.error]': 'isError'
    }
})
export class ProgressBarCircleComponent {

    /** circle size */
    @Input() radius: number = 124;

    /** progress bar percentage, 0~100 */
    @OnChange()
    @Input() percent: number;
    percentChange: EventEmitter<number> = new EventEmitter<number>();

    /** Whether the progress is successful  */
    @Input() isSuccess: boolean = false;

    /** success hint text */
    @Input() successText: string = '完成';

    /** Whether the progress is error  */
    @Input() isError: boolean = false;

    /** error hint text */
    @Input() errorText: string = '错误';

    /** Whether show progress text */
    @Input() showProgressText: boolean = false;

    /**
     * get progress text
     * @docs-private
     */
    get progressText() {
        if (this.isError) {
            return this.errorText;
        }

        if (this.isSuccess) {
            return this.successText;
        }

        return this.percent + '%';
    }

    /**
     * current percentage path's d string
     */
    circlePath = 'M 0 0';

    constructor() {
        this.percentChange.subscribe(
            (percent: number) => {
                const r = this.radius;

                let deg = Math.floor(percent / 100 * 360) ;
                if (deg > 359.9999) {
                    deg = 359.9999;
                }

                this.circlePath = describeArc(r, r, r, 0, deg);
            }
        );
    }
}
