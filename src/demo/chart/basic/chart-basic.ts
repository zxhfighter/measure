import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { BoxGroupValue } from '../../../component/box-group';
import { ECharts, EChartOption } from 'echarts';

const barValue = [
    [749, 1752, 1145, 1912, 1363, 2242, 1538, 2663, 1942, 2838],
    [1489, 517, 1753, 895, 2335, 596, 2434, 2011, 2945, 3200],
    [699, 1268, 929, 1778, 453, 387, 870, 1402, 2797, 1146],
    [1335, 1934, 723, 1915, 2852, 757, 1319, 1238, 2162, 2359],
    [651, 306, 942, 2420, 1013, 899, 2660, 2125, 2639, 1079]
];

const barAxisData = [
    ['05.01', '05.02', '05.03', '05.04', '05.05', '05.06', '05.07', '05.08', '05.09', '05.10'],
    ['首次', '1~5 天', '6~10 天', '11~15 天', '16~20 天', '21~25 天', '26~30 天'],
    ['0~10 分钟', '10~30 分钟', '31~60 分钟', '61~90 分钟', '91~120 分钟'],
    ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '11:00', '12:00', '13:00']
];

const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321];
const yMax = 500;
const dataShadow: number[] = [];

for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

export const chartOptions = {
    line: {},

    bar1: {
        title: {
            text: '柱状基础图表'
        },
        tooltip: {
            // 参见 dux-theme.js
        },
        legend: {
            show: false,
            data: ['总收入'],
            right: 30
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisTick: {
                alignWithLabel: false
            },
            axisLabel: {
                align: 'center',
                showMaxLabel: true,
            },
            data: barAxisData[0]
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                inside: false,
                margin: 10
            }
        }],
        series: [{
            name: '总收入',
            type: 'bar',
            // barWidth: 40,
            barMaxWidth: 40,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true,
                    position: 'top',
                    color: '#333333',
                    fontSize: '14',
                    distance: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(57, 152, 252)'
                }
            },
            data: barValue[0]
        }]
    },

    bar2: {
        title: {
            text: '多数据柱状图表'
            // 参见 dux-theme.js
        },
        tooltip: {
            // 参见 dux-theme.js
        },
        legend: {
            data: ['总收入', 'PV', 'UV'],
            right: 30
            // 参见 dux-theme.js
        },
        toolbox: {
            // 参见 dux-theme.js
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisTick: {
                alignWithLabel: false
            },
            axisLabel: {
                align: 'center',
                showMaxLabel: true,
            },
            data: barAxisData[0]
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                inside: false,
                margin: 10
            }
        }],
        series: [{
            name: '总收入',
            type: 'bar',
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: 'rgb(57, 152, 252)',
                    lineStyle: {
                        width: 1
                    }
                },
                emphasis: {
                    borderWidth: 1,
                }
            },
            // 参见 dux-theme.js
            data: barValue[0]
        }, {
            name: 'PV',
            type: 'bar',
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: 'rgb(91, 196, 159)',
                    lineStyle: {
                        width: 1
                    }
                },
                emphasis: {
                    borderWidth: 1,
                }
            },
            // 参见 dux-theme.js
            data: barValue[1]
        }, {
            name: 'UV',
            type: 'bar',
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: '#66D7D2',
                    lineStyle: {
                        width: 1
                    }
                },
                emphasis: {
                    borderWidth: 1,
                }
            },
            // 参见 dux-theme.js
            data: barValue[2]
        }]
    },

    bar3: {
        title: {
            text: ''
        },
        data: data
    }
};

const valueList = [
    [749, 1752, 1145, 1912, 1363, 2242, 1538, 2663, 1942, 2838],
    [1489, 517, 1753, 895, 2335, 596, 2434, 2011, 2945, 3200],
    [699, 1268, 929, 1778, 453, 387, 870, 1402, 2797, 1146],
    [1335, 1934, 723, 1915, 2852, 757, 1319, 1238, 2162, 2359],
    [651, 306, 942, 2420, 1013, 899, 2660, 2125, 2639, 1079]
];

const categoryList = [
    ['05.01', '05.02', '05.03', '05.04', '05.05', '05.06', '05.07', '05.08', '05.09', '05.10'],
    ['首次', '1~5 天', '6~10 天', '11~15 天', '16~20 天', '21~25 天', '26~30 天'],
    ['0~10 分钟', '10~30 分钟', '31~60 分钟', '61~90 分钟', '91~120 分钟'],
    ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '11:00', '12:00', '13:00']
];


const options = {
    title: {
        text: '线性面积图表'
        // 参见 dux-theme.js
    },
    tooltip: {
        // 参见 dux-theme.js
    },
    legend: {
        show: false,
        data: [{
            name: '总支出',
            icon: 'rect'
        }, {
            name: '图文页阅读数',
            icon: 'rect'
        }],
        right: 30
    },
    toolbox: {
        // 参见 dux-theme.js
    },
    xAxis: [
        {
            data: categoryList[0]
            // 参见 dux-theme.js
        }
    ],
    yAxis: [
        {
            // 参见 dux-theme.js
        }
    ],
    series: [
        {
            name: '总支出',
            type: 'line',
            areaStyle: {
                normal: {
                    color: 'rgba(57,152,252,0.10)'
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(57, 152, 252)',
                    lineStyle: {
                        width: 1
                    }
                },
                emphasis: {
                    borderWidth: 1,
                }
            },
            // 参见 dux-theme.js
            data: valueList[0]
        },
        {
            name: '图文页阅读数',
            type: 'line',
            areaStyle: {
                normal: {
                    color: 'rgba(91, 196, 159, 0.10)'
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(91, 196, 159)',
                    lineStyle: {
                        width: 1
                    }
                },
                emphasis: {
                    borderWidth: 1,
                }
            },
            // 参见 dux-theme.js
            data: valueList[1]
        }
    ]
};
const sunburstData = [{
    name: '搜索',
    value: 100,
    itemStyle: {
        color: '#60ACFC'
    },
    children: [
        {
            name: '知道',
            value: 10,
            itemStyle: {
                color: '#27A1EA'
            },
            children: [
                {
                    name: '图片',
                    value: 20,
                    itemStyle: {
                        color: '#9CDC82'
                    },
                    children: [
                        {
                            name: '离开',
                            value: 10,
                            itemStyle: {
                                color: '#BDC3C7'
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: '贴吧',
            value: 15,
            itemStyle: {
                color: '#63D5B2'
            },
            children: [
                {
                    name: '离开',
                    value: 10,
                    itemStyle: {
                        color: '#BDC3C7'
                    }
                }
            ]
        },
        {
            name: '离开',
            value: 20,
            itemStyle: {
                color: '#BDC3C7'
            }
        }
    ]
}];
const sbOptions = {
    series: {
        type: 'sunburst',
        radius: ['15%', '80%'],
        highlightPolicy: 'ancestor',
        data: sunburstData,
        nodeClick: false,
        label: {
            show: false
        },
        downplay: {
            itemStyle: {
                opacity: 0.2
            }
        }
    }
};

@Component({
    selector: 'demo-chart-basic',
    templateUrl: './chart-basic.html',
    styleUrls: ['./chart-basic.less'],
    encapsulation: ViewEncapsulation.None
})
export class ChartBasicDemo {
    options: any = options;

    barOptions1: any = chartOptions.bar1;
    barOptions2: any = chartOptions.bar2;
    barOptions3: any = chartOptions.bar3;

    sunburstOptions: any = sbOptions;

    constructor(private _cd: ChangeDetectorRef) {
        setTimeout(() => {
            this.lineHeight = 300;
            this.barOptions1 = { ...this.barOptions1 };
            this._cd.markForCheck();
        }, 2000);
    }

    lineHeight = 600;

    onClick(eventParams: any) {
        console.log(eventParams);
    }

    onBarClick(eventParams: any) {
        console.log(eventParams);
    }

    onChartInit(chartInstance: ECharts) {
        console.log(chartInstance);
    }
}
