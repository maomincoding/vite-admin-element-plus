import * as echarts from 'echarts';
import { nextTick } from 'vue'
import useEcharts from '@/utils/useEcharts.js';

// 能耗分析
function getPueTrendOption() {
    let color = ['#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];
    let echartData = [
        {
            name: '1',
            value1: 1.5,
        },
        {
            name: '2',
            value1: 1.1,
        },
        {
            name: '3',
            value1: 1,
        },
        {
            name: '4',
            value1: 1.2,
        },
        {
            name: '5',
            value1: 0.8,
        },
        {
            name: '6',
            value1: 0.9,
        },
        {
            name: '7',
            value1: 0.7,
        },
        {
            name: '8',
            value1: 1.2,
        },
        {
            name: '9',
            value1: 1.7,
        },
        {
            name: '10',
            value1: 1.3,
        },
        {
            name: '11',
            value1: 1.3,
        },
        {
            name: '12',
            value1: 1.3,
        },
    ];

    let xAxisData = echartData.map(v => v.name);
    let yAxisData1 = echartData.map(v => v.value1);
    const hexToRgba = (hex, opacity) => {
        let rgbaColor = '';
        let reg = /^#[\da-f]{6}$/i;
        if (reg.test(hex)) {
            rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt(
                '0x' + hex.slice(5, 7)
            )},${opacity})`;
        }
        return rgbaColor;
    };
    return {
        color: color,
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let html = '';
                params.forEach(v => {
                    html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                      ${v.name} PUE值：
                      <span style="color:${color[v.componentIndex]};font-size: 18px">${v.value}</span>
                      `;
                });

                return html;
            },
            extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: '#ffffff',
                    shadowColor: 'rgba(225,225,225,1)',
                    shadowBlur: 5,
                },
            },
        },
        grid: {
            top: 60,
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    formatter: '{value}月',
                    color: '#333',
                },
                axisLine: {
                    lineStyle: {
                        color: '#D9D9D9',
                    },
                },
                data: xAxisData,
            },
        ],
        yAxis: [
            {
                type: 'value',
                name: 'PUE',
                splitNumber: 3,
                min: 0,
                max: 3,
                axisLabel: {
                    color: '#666',
                },
                nameTextStyle: {
                    color: '#666',
                    fontSize: 12,
                    lineHeight: 40,
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#E9E9E9',
                    },
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
        ],
        series: [
            {
                width: '100%',
                type: 'line',
                smooth: true,
                symbolSize: 8,
                zlevel: 3,
                lineStyle: {
                    color: color[0],
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: hexToRgba(color[0], 0.3),
                            },
                            {
                                offset: 1,
                                color: hexToRgba(color[0], 0.1),
                            },
                        ],
                        false
                    ),
                    shadowColor: hexToRgba(color[0], 0.1),
                    shadowBlur: 10,
                },
                data: yAxisData1,
            },
        ],
    };
}
// 能耗分析（黑）
function getDarkPueTrendOption() {
    let color = ['#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];
    let echartData = [
        {
            name: '1',
            value1: 1.5,
        },
        {
            name: '2',
            value1: 1.1,
        },
        {
            name: '3',
            value1: 1,
        },
        {
            name: '4',
            value1: 1.2,
        },
        {
            name: '5',
            value1: 0.8,
        },
        {
            name: '6',
            value1: 0.9,
        },
        {
            name: '7',
            value1: 0.7,
        },
        {
            name: '8',
            value1: 1.2,
        },
        {
            name: '9',
            value1: 1.7,
        },
        {
            name: '10',
            value1: 1.3,
        },
        {
            name: '11',
            value1: 1.3,
        },
        {
            name: '12',
            value1: 1.3,
        },
    ];

    let xAxisData = echartData.map(v => v.name);
    let yAxisData1 = echartData.map(v => v.value1);
    const hexToRgba = (hex, opacity) => {
        let rgbaColor = '';
        let reg = /^#[\da-f]{6}$/i;
        if (reg.test(hex)) {
            rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt(
                '0x' + hex.slice(5, 7)
            )},${opacity})`;
        }
        return rgbaColor;
    };
    return {
        color: color,
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let html = '';
                params.forEach(v => {
                    html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                      ${v.name}月 PUE值：
                      <span style="color:${color[v.componentIndex]};font-size: 18px">${v.value}</span>
                      `;
                });

                return html;
            },
            extraCssText: 'background: #999; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            top: 60,
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    formatter: '{value}月',
                    color: '#999',
                },
                axisLine: {
                    lineStyle: {
                        color: '#D9D9D9',
                    },
                },
                data: xAxisData,
            },
        ],
        yAxis: [
            {
                type: 'value',
                name: 'PUE',
                splitNumber: 3,
                min: 0,
                max: 3,
                axisLabel: {
                    color: '#999',
                },
                nameTextStyle: {
                    color: '#999',
                    fontSize: 12,
                    lineHeight: 40,
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#E9E9E9',
                    },
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
        ],
        series: [
            {
                width: '100%',
                type: 'line',
                smooth: true,
                symbolSize: 8,
                zlevel: 3,
                lineStyle: {
                    color: color[0],
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: hexToRgba(color[0], 0.3),
                            },
                            {
                                offset: 1,
                                color: hexToRgba(color[0], 0.1),
                            },
                        ],
                        false
                    ),
                    shadowColor: hexToRgba(color[0], 0.1),
                    shadowBlur: 10,
                },
                data: yAxisData1,
            },
        ],
    };
}
// 打开能耗分析弹窗
function openPueTrendView({ pueTrendView, chart, theme }) {
    pueTrendView.value = true;
    const useDarkChart = () => {
        nextTick(() => {
            chart.f6 = useEcharts(echarts, '.pue-trend', getDarkPueTrendOption());
        });
    };
    const useLightChart = () => {
        nextTick(() => {
            chart.f6 = useEcharts(echarts, '.pue-trend', getPueTrendOption());
        });
    };

    if (theme.value) {
        if (chart.f6 !== null) {
            chart.f6.dispose();
        }
        useDarkChart();
    } else {
        if (chart.f6 !== null) {
            chart.f6.dispose();
        }
        useLightChart();
    }
}

export {
    openPueTrendView
}