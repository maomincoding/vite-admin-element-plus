// 能耗统计
function getF2ChartOption() {
    var xData = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
    ];
    let itemName = ['购进'];
    return {
        dataZoom: [
            {
                show: true,
                height: 10,
                xAxisIndex: [0],
                bottom: 15,
                start: 1,
                end: 30,
                handleStyle: {
                    color: '#d3dee5',
                },
                color: '#333',
                borderColor: '#90979c',
            },
            {
                type: 'inside',
                show: true,
                height: 15,
                start: 1,
                end: 30,
            },
        ],
        tooltip: {
            trigger: 'axis',
            formatter: params => {
                return `
                  ${params[0].name}号：${params[0].value} KVA
              `;
            },
            axisPointer: {
                type: 'shadow',
                color: '#333',
            },
        },
        grid: {
            top: 65,
            left: 30,
            right: 30,
            bottom: 30,
            containLabel: true, // 防止标签溢出
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    interval: false,
                    color: '#333',
                    fontSize: 14,
                },
                axisLine: {
                    lineStyle: {
                        color: '#EAEAEA',
                    },
                },
                axisTick: {
                    show: false,
                },
                splitArea: {
                    show: false,
                },
                data: xData,
            },
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#EAEAEA',
                    },
                },
                axisTick: {
                    show: true,
                },
                name: 'KVA',
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#333333',
                    align: 'left',
                    fontSize: 14,
                    padding: [0, 0, 0, 0],
                },
                axisLabel: {
                    interval: true,
                    formatter: '{value}',
                    color: '#333333',
                    fontSize: 14,
                },
                splitNumber: 4,
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(255, 255, 255,0.7)',
                    },
                },
            },
        ],
        series: [
            {
                position: 'insideTop',
                name: itemName[0],
                type: 'bar',
                barMaxWidth: 8,
                barGap: '80%',
                itemStyle: {
                    color: '#4091C9',
                    borderRadius: [12, 12, 0, 0],
                },
                data: [
                    1000,
                    1200,
                    1600,
                    1400,
                    1320,
                    1400,
                    1100,
                    1500,
                    1800,
                    1500,
                    2200,
                    1200,
                    1300,
                    1200,
                    1260,
                    1200,
                    1530,
                    1200,
                    1200,
                    1200,
                    1700,
                    1200,
                    1800,
                    1100,
                    1500,
                    1300,
                    1300,
                    1100,
                    1600,
                    1200,
                ],
            },
        ],
    };
}
// 能耗统计（黑）
function getF2DarkChartOption() {
    var xData = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
    ];
    let itemName = ['购进'];
    return {
        dataZoom: [
            {
                show: true,
                height: 10,
                xAxisIndex: [0],
                bottom: 15,
                start: 1,
                end: 30,
                handleStyle: {
                    color: '#d3dee5',
                },
                color: '#fff',
                borderColor: '#90979c',
            },
            {
                type: 'inside',
                show: true,
                height: 15,
                start: 1,
                end: 30,
            },
        ],

        tooltip: {
            trigger: 'axis',
            formatter: params => {
                return `
                  ${params[0].name}号：${params[0].value} KVA
              `;
            },
            axisPointer: {
                type: 'shadow',
                color: '#333',
            },
        },
        grid: {
            top: 65,
            left: 30,
            right: 30,
            bottom: 30,
            containLabel: true, // 防止标签溢出
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    interval: false,
                    color: '#999',
                    fontSize: 14,
                },
                axisLine: {
                    lineStyle: {
                        color: '#EAEAEA',
                    },
                },
                axisTick: {
                    show: false,
                },
                splitArea: {
                    show: false,
                },
                data: xData,
            },
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#EAEAEA',
                    },
                },
                axisTick: {
                    show: true,
                },
                name: 'KVA',
                nameTextStyle: {
                    color: '#999',
                    align: 'left',
                    fontSize: 14,
                    padding: [0, 0, 0, 0],
                },
                axisLabel: {
                    interval: true,
                    formatter: '{value}',
                    color: '#999',
                    fontSize: 14,
                },
                splitNumber: 4,
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(255, 255, 255,0.7)',
                    },
                },
            },
        ],
        series: [
            {
                position: 'insideTop',
                name: itemName[0],
                type: 'bar',
                barMaxWidth: 8,
                barGap: '80%',
                itemStyle: {
                    color: '#4091C9',
                    borderRadius: [12, 12, 0, 0],
                },
                data: [
                    1000,
                    1200,
                    1600,
                    1400,
                    1320,
                    1400,
                    1100,
                    1500,
                    1800,
                    1500,
                    2200,
                    1200,
                    1300,
                    1200,
                    1260,
                    1200,
                    1530,
                    1200,
                    1200,
                    1200,
                    1700,
                    1200,
                    1800,
                    1100,
                    1500,
                    1300,
                    1300,
                    1100,
                    1600,
                    1200,
                ],
            },
        ],
    };
}

export {
    getF2ChartOption,
    getF2DarkChartOption
}