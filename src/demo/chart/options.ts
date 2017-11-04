const barValue = [
    [749, 1752, 1145, 1912, 1363, 2242, 1538, 2663, 1942, 2838],
    [1489, 517, 1753, 895, 2335, 596, 2434, 2011, 2945, 3200],
    [699, 1268, 929, 1778, 453, 387, 870, 1402, 2797, 1146],
    [1335, 1934, 723, 1915, 2852, 757, 1319, 1238, 2162, 2359],
    [651, 306, 942, 2420, 1013, 899, 2660, 2125, 2639, 1079]
];

const barAxisData = [
    ["05.01", "05.02", "05.03", "05.04", "05.05", "05.06", "05.07", "05.08", "05.09", "05.10"],
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

export const options = {
    line: {},

    bar1: {
        title: {
            text: "柱状基础图表"
        },
        tooltip: {
            // 参见 dux-theme.js
        },
        legend: {
            show: false,
            data: ["总收入"],
            right: 30
        },
        xAxis: [{
            type: "category",
            boundaryGap: true,
            axisTick: {
                alignWithLabel: false
            },
            axisLabel: {
                align: "center",
                showMaxLabel: true,
            },
            data: barAxisData[0]
        }],
        yAxis: [{
            type: "value",
            axisLabel: {
                inside: false,
                margin: 10
            }
        }],
        series: [{
            name: "总收入",
            type: "bar",
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
                    color: "rgb(57, 152, 252)"
                }
            },
            data: barValue[0]
        }]
    },

    bar2: {
        title: {
            text: "多数据柱状图表"
                // 参见 dux-theme.js
        },
        tooltip: {
            // 参见 dux-theme.js
        },
        legend: {
            data: ["总收入", "PV", "UV"],
            right: 30
                // 参见 dux-theme.js
        },
        toolbox: {
            // 参见 dux-theme.js
        },
        xAxis: [{
            type: "category",
            boundaryGap: true,
            axisTick: {
                alignWithLabel: false
            },
            axisLabel: {
                align: "center",
                showMaxLabel: true,
            },
            data: barAxisData[0]
        }],
        yAxis: [{
            type: "value",
            axisLabel: {
                inside: false,
                margin: 10
            }
        }],
        series: [{
            name: "总收入",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: "rgb(57, 152, 252)",
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
            name: "PV",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: "rgb(91, 196, 159)",
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
            name: "UV",
            type: "bar",
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: "#66D7D2",
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
            text: "条形图表"
        },

        tooltip: {},
        legend: {
            show: false
        },
        toolbox: {},
        xAxis: [{
            type: "value",
            inside: false,
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            },
            margin: 10
        }],
        yAxis: [{
            type: "category",
            boundaryGap: true,
            axisLine: {
                show: false
            },
            axisLabel: {
                align: "right",
                margin: 10,
                showMaxLabel: true,
            },
            data: barAxisData[0]
        }],
        series: [{
            type: "bar",
            itemStyle: {
                normal: {
                    color: 'rgba(0,0,0,0.05)'
                }
            },
            barWidth: 12,
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
        }, {
            name: "图文阅读数",
            type: "bar",
            barWidth: 12,
            itemStyle: {
                normal: {
                    color: "#60ACFC"
                }
            },
            data: data
        }]
    }
}
