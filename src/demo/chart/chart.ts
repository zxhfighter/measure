import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import {options as chartOptions} from './options';

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

@Component({
    selector: 'demo-chart',
    templateUrl: './chart.html',
    styleUrls: ['./chart.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoChart implements OnInit {

    options: any = options;

    barOptions1: any = chartOptions.bar1;
    barOptions2: any = chartOptions.bar2;
    barOptions3: any = chartOptions.bar3;

    constructor() {

    }

    ngOnInit() {

    }
}
