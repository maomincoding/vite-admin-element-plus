// 能耗占比
function getF1ChartOption() {
    const colorList = ['#FEDFD4', '#FEDFD4', '#F26A4F', '#EF3C2D', '#CB1B16', '#991511', '#0D4A78', '#1368AA', '#4091C9', '#9DCEE2'];
    return {
        tooltip: {
            formatter: params => {
                return `
                  <div>${params.data.name}: ${params.data.value}%</div>
              `;
            },
        },
        legend: {
            width: '50%',
            height: '50%',
            top: 'center',
            left: '5%',
            orient: 'vertical',
            type: 'scroll',
            pageTextStyle: {
                color: '#333',
            },
            color: '#333',
        },
        series: [
            {
                type: 'pie',
                center: ['60%', '50%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                itemStyle: {
                    width: 15,
                    color: function (params) {
                        return colorList[params.dataIndex];
                    },
                },
                label: {
                    show: true,
                    color: '#999',
                    fontSize: 12,
                    formatter: '{b}：{d}%\n',
                },
                labelLine: {
                    length: 2,
                    lineStyle: {
                        width: 1,
                    },
                },
                data: [
                    { value: 10, name: '照明' },
                    { value: 10, name: '电梯' },
                    { value: 10, name: '空调' },
                    { value: 10, name: '冷库' },
                    { value: 10, name: '生产线' },
                    { value: 10, name: '水泵' },
                    { value: 10, name: '消防' },
                    { value: 10, name: '空调机组' },
                    { value: 10, name: '风机' },
                    { value: 10, name: '冷却塔' },
                ],
            },
        ],
    };
}
// 能耗占比（黑）
function getF1DarkChartOption() {
    const colorList = ['#FEDFD4', '#FEDFD4', '#F26A4F', '#EF3C2D', '#CB1B16', '#991511', '#0D4A78', '#1368AA', '#4091C9', '#9DCEE2'];
    return {
        tooltip: {
            formatter: params => {
                return `
                  <div>${params.data.name}: ${params.data.value}%</div>
              `;
            },
        },
        legend: {
            width: '50%',
            height: '50%',
            top: 'center',
            left: '5%',
            orient: 'vertical',
            type: 'scroll',
            pageTextStyle: {
                color: '#fff',
            },
            textStyle: {
                color: '#ddd',
            },
        },
        series: [
            {
                type: 'pie',
                center: ['60%', '50%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                itemStyle: {
                    width: 15,
                    color: function (params) {
                        return colorList[params.dataIndex];
                    },
                },
                label: {
                    show: true,
                    color: '#999',
                    formatter: '{b}：{d}%\n',
                },
                labelLine: {
                    length: 2,
                    lineStyle: {
                        width: 1,
                    },
                },
                data: [
                    { value: 10, name: '照明' },
                    { value: 10, name: '电梯' },
                    { value: 10, name: '空调' },
                    { value: 10, name: '冷库' },
                    { value: 10, name: '生产线' },
                    { value: 10, name: '水泵' },
                    { value: 10, name: '消防' },
                    { value: 10, name: '空调机组' },
                    { value: 10, name: '风机' },
                    { value: 10, name: '冷却塔' },
                ],
            },
        ],
    };
}

export {
    getF1ChartOption,
    getF1DarkChartOption
}