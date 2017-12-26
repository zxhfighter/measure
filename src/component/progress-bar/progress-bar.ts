import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

/**
 * Progress Bar Component
 */
@Component({
    selector: 'nb-progress-bar',
    templateUrl: './progress-bar.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-progress-bar'
    },
    exportAs: 'nbProgressBar'
})
export class ProgressBarComponent {

    /**
     * Emit a event with the current progress value when the progressbar is closed
     */
    @Output() close: EventEmitter<number> = new EventEmitter<number>();

    /** Emit a event when the progressbar is refreshed */
    @Output() refresh: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Current progress bar value
     * @default 0
     */
    @Input() value: number = 0;

    /**
     * Compute percent
     * @docs-private
     */
    get percent(): number {
        if (this.value && this.maxValue && this.maxValue !== 0) {
            return Math.floor((this.value / this.maxValue) * 100);
        }
        return 0;
    }

    /**
     * Progress bar max value
     * @default 100
     */
    @Input() maxValue: number = 100;

    /**
     * Whether the progress is successful
     * @default false
     */
    @Input() isSuccess: boolean = false;

    /**
     * Success text when progress bar is done
     * @default 完成
     */
    @Input() successText: string = '完成';

    /**
     * Whether the progress is error
     * @default false
     */
    @Input() isError: boolean = false;

    /**
     * Error text when progress bar is error
     * @default false
     */
    @Input() errorText: string = '错误';

    /**
     * Whether show progress text
     * @default false
     */
    @Input() showProgressText: boolean = false;

    /**
     * Whether show operation buttons
     * @default false
     */
    @Input() showOperation: boolean = false;

    /**
     * close progressbar
     * @docs-private
     */
    onClose() {
        this.close.emit(this.value);
    }

    /**
     * refresh progressbar
     * @docs-private
     */
    onRefresh() {
        this.refresh.emit(this.value);
    }
}
