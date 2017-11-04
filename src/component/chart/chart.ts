import {
    Component, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild,
    ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, OnDestroy
} from '@angular/core';
import * as echarts from 'echarts';

declare type echarts = any;

import {OnChange} from '../core/decorators';

@Component({
    selector: 'nb-chart',
    templateUrl: './chart.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-chart'
    }
})
export class ChartComponent implements AfterViewInit, OnDestroy {

    /** chart default width */
    @Input() width: number | string = 600;

    /** chart default height */
    @Input() height: number | string = 400;

    /** chart title */
    @Input() chartTitle: string = '';

    /** chart options */
    @OnChange()
    @Input() options: any;

    @ViewChild('chartContainer') _chartContainer: ElementRef;

    /** callback when chart options change */
    optionsChange: EventEmitter<any> = new EventEmitter<any>();

    /**
     * chart instance
     * @docs-private
     */
    _chartInstance: any;

    /** chart auto resize when window resize */
    _resizeListener: any;

    constructor(private _el: ElementRef, private _renderer: Renderer2) {
        this.setOptionsChangeListener();
    }

    /**
     * set window resize handler
     * @docs-private
     */
    setOptionsChangeListener() {
        this.optionsChange.subscribe((options: any) => {
            try {
                if (!this._chartInstance && this._chartContainer) {
                    const container = this._chartContainer.nativeElement;
                    const width = this.width + '';
                    const height = this.height + '';
                    const widthUnit = width.indexOf('%') === -1 ? 'px' : '';
                    const heightUnit = height.indexOf('%') === -1 ? 'px' : '';

                    this._renderer.setStyle(container, 'width', width + widthUnit);
                    this._renderer.setStyle(container, 'height', height + heightUnit);

                    this._chartInstance = echarts.init(container);
                }

                this._chartInstance.setOption(options, true);
            }
            catch {
                throw new Error('chart component may not work in web work or universal apps');
            }
        });
    }

    ngAfterViewInit() {
        this._resizeListener = this._renderer.listen('window', 'resize', () => {
            this._chartInstance.resize();
        });
    }

    ngOnDestroy() {
        this._chartInstance = null;
        delete this._chartInstance;

        if (this._resizeListener) {
            this._resizeListener();
        }
    }
}
