import {
    Component, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild,
    ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, OnDestroy
} from '@angular/core';
import { EChartOption, ECharts, init } from 'echarts';
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
    exportAs: 'nbChart'
})
export class ChartComponent implements AfterViewInit, OnDestroy {

    /**
     * chart init event
     */
    @Output() chartInit: EventEmitter<ECharts> = new EventEmitter<ECharts>();

    /**
     * chart event
     */
    @Output() chartEvent: EventEmitter<any> = new EventEmitter<any>();

    /**
     * chart event name
     * @default click
     */
    @Input() eventName: string = 'click';

    /**
     * chart width, can be a number(400) or a percent(30%)
     * @default 600
     */
    @OnChange()
    @Input() width: number | string = 600;

    widthChange: EventEmitter<number | string> =  new EventEmitter<number | string>();

    /**
     * chart height, can be a number(400) or a percent(30%)
     * @default 400
     */
    @OnChange()
    @Input() height: number | string = 400;

    heightChange: EventEmitter<number | string> =  new EventEmitter<number | string>();

    /**
     * chart title
     * @default ''
     */
    @Input() chartTitle: string = '';

    /**
     * chart options, see [echarts options](http://echarts.baidu.com/option.html)
     */
    @OnChange()
    @Input() options: EChartOption;

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

    /** if chart event is binded */
    _eventBinded: boolean = false;

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

                    this._chartInstance = init(container);
                    this.chartInit.emit(this._chartInstance);
                }

                this._chartInstance.setOption(options, true);

                // if the event is binded, don't bind it again, otherwise their will be multi events
                if (this.eventName && !this._eventBinded) {
                    this._chartInstance.on(this.eventName, (params: any) => {
                        this.chartEvent.emit({
                            target: this._chartInstance,
                            params: params
                        });
                    });

                    this._eventBinded = true;
                }
            }
            catch {
                throw new Error('chart component may not work in web work or universal apps');
            }
        });

        this.heightChange.subscribe(height => {
            if (this._chartInstance) {
                const container = this._chartContainer.nativeElement;
                const heightUnit = (height + '').indexOf('%') === -1 ? 'px' : '';
                this._renderer.setStyle(container, 'height', height + heightUnit);

                this._chartInstance.resize({
                    height
                });
            }
        });

        this.widthChange.subscribe(width => {
            if (this._chartInstance) {
                const container = this._chartContainer.nativeElement;
                const widthUnit = (width + '').indexOf('%') === -1 ? 'px' : '';
                this._renderer.setStyle(container, 'width', width + widthUnit);

                this._chartInstance.resize({
                    width
                });
            }
        });
    }

    ngAfterViewInit() {
        this._resizeListener = this._renderer.listen('window', 'resize', () => {
            this._chartInstance.resize();
        });
    }

    ngOnDestroy() {
        if (this._chartInstance) {
            this._chartInstance.dispose();
            this._chartInstance = null;
        }

        if (this._resizeListener) {
            this._resizeListener();
        }
    }
}
