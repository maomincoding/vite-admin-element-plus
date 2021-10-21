// 能耗分析
function getF3ChartOption() {
    return {
        tooltip: {
            formatter: params => {
                return `
                  <div>PUE值: ${params.data.value}</div>
              `;
            },
        },
        series: [
            {
                tooltip: {
                    show: false,
                },
                name: '刻度',
                type: 'gauge',
                radius: '130%',
                z: 1,
                min: 0,
                max: 3,
                center: ['50%', '85%'],
                splitNumber: 2, //刻度数量
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 10,
                        color: [
                            [0.5, '#4091C9'],
                            [1, '#F26A4F'],
                        ],
                    },
                }, //仪表盘轴线
                axisLabel: {
                    show: false,
                }, //刻度标签。
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        width: 0,
                    },
                    length: -5,
                }, //刻度样式
                splitLine: {
                    show: true,
                    length: 0,
                    lineStyle: {
                        color: '#fff',
                        width: 2,
                    },
                }, //分隔线样式
                detail: {
                    show: false,
                },
                pointer: {
                    show: false,
                },
            },
            // 中间圆
            {
                type: 'gauge',
                radius: '124%', // 位置
                center: ['50%', '85%'],
                min: 0,
                max: 3,
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                    show: true,
                    lineStyle: {
                        // 轴线样式
                        width: 90, // 宽度
                        color: [
                            [0.5, '#9DCEE2'],
                            [1, '#F29479'],
                        ],
                    },
                },
                axisTick: {
                    // 刻度
                    show: false,
                },
                splitLine: {
                    // 分割线
                    show: false,
                },
                axisLabel: {
                    // 刻度标签
                    show: false,
                },
                pointer: {
                    // 仪表盘指针
                    show: false,
                },
                detail: {
                    // 仪表盘详情
                    show: false,
                },
            },
            {
                type: 'gauge',
                radius: '120%',
                min: 0,
                max: 3,
                center: ['50%', '82%'],
                data: [
                    {
                        value: 1.5,
                    },
                ],
                splitNumber: 2, //刻度数量
                startAngle: 180,
                endAngle: 0,
                z: 5,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0,
                        color: [
                            [0.5, '#4091C9'],
                            [1, '#F26A4F'],
                        ],
                    },
                }, //仪表盘轴线
                axisLabel: {
                    show: true,
                    color: '#fff',
                    fontSize: 16,
                    distance: 5,
                }, //刻度标签。
                axisTick: {
                    splitNumber: 4,
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        width: 2,
                    },
                    length: 5,
                }, //刻度样式
                splitLine: {
                    show: true,
                    length: 10,
                    lineStyle: {
                        color: '#fff',
                        width: 5,
                    },
                }, //分隔线样式

                itemStyle: {
                    color: '#C7CCD4', //指针颜色
                },
                pointer: {
                    width: 6,
                    length: '60%',
                    offsetCenter: ['0%', '-10%'],
                },
                detail: {
                    formatter: function (params) {
                        return `PUE = ${params}`;
                    },
                    fontSize: 16,
                    color: '#999',
                    offsetCenter: ['0%', '-120%'],
                },
                title: {
                    show: false,
                },
            },
        ],
    };
}

export {
    getF3ChartOption
}