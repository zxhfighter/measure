import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

/**
 * Progress bar
 */
@Component({
    selector: 'nb-progress-bar',
    templateUrl: './progress-bar.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-progress-bar'
    }
})
export class ProgressBarComponent {

    /** When the progressbar is close */
    @Output() close: EventEmitter<number> = new EventEmitter<number>();

    /** When the progressbar is refresh */
    @Output() refresh: EventEmitter<number> = new EventEmitter<number>();

    /** current progress bar value */
    @Input() value: number = 0;

    /**
     * compute percent
     * @docs-private
     */
    get percent(): number {
        if (this.value && this.maxValue && this.maxValue !== 0) {
            return Math.floor((this.value / this.maxValue) * 100);
        }
        return 0;
    }

    /** progress bar max value */
    @Input() maxValue: number = 100;

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

    /** Whether show operation */
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
