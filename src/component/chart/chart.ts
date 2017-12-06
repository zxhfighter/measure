import {
    Component, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild,
    ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, OnDestroy
} from '@angular/core';
import * as echarts from 'echarts';

import { OnChange } from '../core/decorators';

/**
 * Chart Component, depends on [Echarts](http://echarts.baidu.com/)
 */
@Component({
    selector: 'nb-chart',
    templateUrl: './chart.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-chart'
    },
    exportAs: 'xChart'
})
export class ChartComponent implements AfterViewInit, OnDestroy {

    /**
     * chart width, can be a number(400) or a percent(30%)
     * @default 600
     */
    @Input() width: number | string = 600;

    /**
     * chart height, can be a number(400) or a percent(30%)
     * @default 400
     */
    @Input() height: number | string = 400;

    /**
     * chart title
     * @default ''
     */
    @Input() chartTitle: string = '';

    /**
     * chart options, see [echarts options](http://echarts.baidu.com/option.html)
     */
    @OnChange()
    @Input() options: any;

    /**
     * callback when chart options change
     * @docs-private
     */
    optionsChange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('chartContainer') _chartContainer: ElementRef;

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
