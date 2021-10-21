import * as echarts from 'echarts';
import { nextTick } from 'vue'
import useEcharts from '@/utils/useEcharts.js';

// 能耗占比排行
function getRankingEnergyOption(rankingEnergyBox) {
    let autoHeight = 600;
    nextTick(() => {
        rankingEnergyBox.value.style.height = `${autoHeight}px`;
    });

    var data = [
        { code: '600519', stock: '照明', fundPost: '21.987691' },
        { code: '000858', stock: '电梯', fundPost: '20.377176' },
        { code: '002475', stock: '空调', fundPost: '19.127404' },
        { code: '600276', stock: '冷库', fundPost: '18.40882' },
        { code: '601318', stock: '生产线', fundPost: '17.980597' },
        { code: '000661', stock: '水泵', fundPost: '16.957898' },
        { code: '000333', stock: '消防', fundPost: '15.099577' },
        { code: '300760', stock: '空调机组', fundPost: '14.76103' },
        { code: '300750', stock: '风机', fundPost: '13.002175' },
        { code: '601888', stock: '冷却塔', fundPost: '12.133536' },
    ];

    var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: '#EB3B5A' },
            { offset: 1, color: '#FE9C5A' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: '#FA8231' },
            { offset: 1, color: '#FFD14C' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: '#F7B731' },
            { offset: 1, color: '#FFEE96' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: '#395CFE' },
            { offset: 1, color: '#2EC7CF' },
        ]),
    ];
    var attackSourcesColor1 = [
        '#EB3B5A',
        '#FA8231',
        '#F7B731',
        '#3860FC',
        '#1089E7',
        '#F57474',
        '#56D0E3',
        '#1089E7',
        '#F57474',
        '#1089E7',
        '#F57474',
        '#F57474',
    ];
    var attaData = [];
    var attaName = [];
    var topName = [];
    data.forEach((it, index) => {
        attaData[index] = parseFloat(it.fundPost).toFixed(2);
        attaName[index] = it.stock;
        topName[index] = `${it.code} ${it.stock}`;
    });
    var salvProMax = []; //背景按最大值
    for (let i = 0; i < attaData.length; i++) {
        salvProMax.push(attaData[0]);
    }
    function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function (item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
            };
            sss.push({
                value: item,
                itemStyle: itemStyle,
            });
        });
        return sss;
    }
    return {
        color: ['#F7B731'],
        grid: {
            left: '2%',
            right: '2%',
            width: '95%',
            bottom: '2%',
            top: '2%',
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: [
            {
                type: 'category',
                inverse: true,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisPointer: {
                    label: {
                        show: true,
                    },
                },
                pdaaing: [5, 0, 0, 0],
                postion: 'right',
                data: attaName,
                axisLabel: {
                    margin: 30,
                    fontSize: 12,
                    align: 'left',
                    padding: [0, 0, 0, 0],
                    color: '#000',
                    rich: {
                        nt1: {
                            color: '#fff',
                            backgroundColor: attackSourcesColor1[0],
                            width: 15,
                            height: 15,
                            fontSize: 10,
                            align: 'center',
                            borderRadius: 100,
                            lineHeight: 15,
                            padding: [4, 2, 2, 2],
                        },
                        nt2: {
                            color: '#fff',
                            backgroundColor: attackSourcesColor1[1],
                            width: 15,
                            height: 15,
                            lineHeight: 15,
                            fontSize: 10,
                            align: 'center',
                            borderRadius: 100,
                            padding: [4, 2, 2, 2],
                        },
                        nt3: {
                            color: '#fff',
                            backgroundColor: attackSourcesColor1[2],
                            width: 15,
                            height: 15,
                            fontSize: 10,
                            lineHeight: 15,
                            align: 'center',
                            borderRadius: 100,
                            padding: [4, 2, 2, 2],
                        },
                        nt: {
                            color: '#fff',
                            backgroundColor: attackSourcesColor1[3],
                            width: 15,
                            height: 15,
                            fontSize: 10,
                            align: 'center',
                            borderRadius: 100,
                            padding: [4, 2, 2, 2],
                            lineHeight: 15,
                        },
                    },
                    formatter: function (value, index) {
                        index = index + 1;
                        if (index - 1 < 3) {
                            return ['{nt' + index + '|' + index + '}'].join('\n');
                        } else {
                            return ['{nt|' + index + '}'].join('\n');
                        }
                    },
                },
            },
            {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    color: '#333',
                    fontSize: '14',
                },
                position: 'center',
                data: attackSourcesDataFmt(attaName),
            },
            {
                //名称
                type: 'category',
                offset: -10,
                position: 'left',
                axisLine: {
                    show: false,
                },
                inverse: false,
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                data: topName,
            },
        ],
        series: [
            {
                zlevel: 1,
                type: 'bar',
                barWidth: '15px',
                animationDuration: 1500,
                data: attackSourcesDataFmt(attaData),
                align: 'center',
                itemStyle: {
                    borderRadius: 10,
                },
                label: {
                    show: true,
                    fontSize: 14,
                    color: '#333',
                    textBorderWidth: 2,
                    padding: [2, 0, 0, 0],
                },
            },
            {
                type: 'bar',
                barWidth: 15,
                barGap: '-100%',
                data: salvProMax,
                fontSize: 12,
                color: '#333',
                itemStyle: {
                    color: '#F8F8F8',
                    fontSize: 12,
                    borderRadius: 30,
                },
            },
        ],
    };
}
// 能耗占比排行（黑）
function getDarkRankingEnergyOption(rankingEnergyBox) {
    let autoHeight = 600;
    nextTick(() => {
        rankingEnergyBox.value.style.height = `${autoHeight}px`;
    });

    var data = [
        { code: '600519', stock: '照明', fundPost: '21.987691' },
        { code: '000858', stock: '电梯', fundPost: '20.377176' },
        { code: '002475', stock: '空调', fundPost: '19.127404' },
        { code: '600276', stock: '冷库', fundPost: '18.40882' },
        { code: '601318', stock: '生产线', fundPost: '17.980597' },
        { code: '000661', stock: '水泵', fundPost: '16.957898' },
        { code: '000333', stock: '消防', fundPost: '15.099577' },
        { code: '300760', stock: '空调机组', fundPost: '14.76103' },
        { code: '300750', stock: '风机', fundPost: '13.002175' },
        { code: '601888', stock: '冷却塔', fundPost: '12.133536' },
    ];

    var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: '#EB3B5A' },
            { offset: 1, color: '#FE9C5A' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: '#FA8231' },
            { offset: 1, color: '#FFD14C' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: '#F7B731' },
            { offset: 1, color: '#FFEE96' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: '#395CFE' },
            { offset: 1, color: '#2EC7CF' },
        ]),
    ];
    var attackSourcesColor1 = [
        '#EB3B5A',
        '#FA8231',
        '#F7B731',
        '#3860FC',
        '#1089E7',
        '#F57474',
        '#56D0E3',
        '#1089E7',
        '#F57474',
        '#1089E7',
        '#F57474',
        '#F57474',
    ];
    var attaData = [];
    var attaName = [];
    var topName = [];
    data.forEach((it, index) => {
        attaData[index] = parseFloat(it.fundPost).toFixed(2);
        attaName[index] = it.stock;
        topName[index] = `${it.code} ${it.stock}`;
    });
    var salvProMax = []; //背景按最大值
    for (let i = 0; i < attaData.length; i++) {
        salvProMax.push(attaData[0]);
    }
    function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function (item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
            };
            sss.push({
                value: item,
                itemStyle: itemStyle,
            });
        });
        return sss;
    }
    return {
        color: ['#F7B731'],
        grid: {
            left: '2%',
            right: '2%',
            width: '95%',
            bottom: '2%',
            top: '2%',
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: [
            {
                type: 'category',
                inverse: true,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisPointer: {
                    label: {
                        show: true,
                    },
                },
                pdaaing: [5, 0, 0, 0],
                postion: 'right',
                data: attaName,
                axisLabel: {
                    margin: 30,
                    fontSize: 12,
                    align: 'left',
                    padding: [0, 0, 0, 0],
                    color: '#fff',
                    rich: {
                        nt1: {
                            color: '#fff',
                            backgroundColor: attackSourcesColor1[0],
                            width: 15,
                            height: 15,
                            fontSize: 10,
                            align: 'center',
                            borderRadius: 100,
                            lineHeight: 15,
                            padding: [4, 2, 2, 2],
                        },
                        nt2: {
                            color: '#fff',
                            backgroundColor: attackSourcesColor1[1],
                            width: 15,
                            height: 15,
                            lineHeight: 15,
                            fontSize: 10,
                            align: 'center',
                            borderRadius: 100,
                            padding: [4, 2, 2, 2],
                        },
                        nt3: {
                            color: '#fff',
                            backgroundColor: attackSourcesColor1[2],
                            width: 15,
                            height: 15,
                            fontSize: 10,
                            lineHeight: 15,
                            align: 'center',
                            borderRadius: 100,
                            padding: [4, 2, 2, 2],
                        },
                        nt: {
                            color: '#fff',
                            backgroundColor: attackSourcesColor1[3],
                            width: 15,
                            height: 15,
                            fontSize: 10,
                            align: 'center',
                            borderRadius: 100,
                            padding: [4, 2, 2, 2],
                            lineHeight: 15,
                        },
                    },
                    formatter: function (value, index) {
                        index = index + 1;
                        if (index - 1 < 3) {
                            return ['{nt' + index + '|' + index + '}'].join('\n');
                        } else {
                            return ['{nt|' + index + '}'].join('\n');
                        }
                    },
                },
            },
            {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    color: '#fff',
                    fontSize: '14',
                },
                position: 'center',
                data: attackSourcesDataFmt(attaName),
            },
            {
                //名称
                type: 'category',
                offset: -10,
                position: 'left',
                axisLine: {
                    show: false,
                },
                inverse: false,
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                data: topName,
            },
        ],
        series: [
            {
                zlevel: 1,
                type: 'bar',
                barWidth: '15px',
                animationDuration: 1500,
                data: attackSourcesDataFmt(attaData),
                align: 'center',
                itemStyle: {
                    borderRadius: 10,
                },
                label: {
                    show: true,
                    fontSize: 14,
                    color: '#fff',
                    textBorderWidth: 2,
                    padding: [2, 0, 0, 0],
                },
            },
            {
                type: 'bar',
                barWidth: 15,
                barGap: '-100%',
                data: salvProMax,
                fontSize: 12,
                color: '#fff',
                itemStyle: {
                    color: '#444',
                    fontSize: 12,
                    borderRadius: 30,
                },
            },
        ],
    };
}
// 打开能耗占比排行弹窗
function openRankingEnergyBoxView({ rankingEnergyBoxView, chart, theme, rankingEnergyBox }) {
    rankingEnergyBoxView.value = true;
    const useDarkChart = () => {
        nextTick(() => {
            chart.f5 = useEcharts(echarts, '.ranking-energy', getDarkRankingEnergyOption(rankingEnergyBox));
        });
    };
    const useLightChart = () => {
        nextTick(() => {
            chart.f5 = useEcharts(echarts, '.ranking-energy', getRankingEnergyOption(rankingEnergyBox));
        });
    };
    if (theme.value) {
        if (chart.f5 !== null) {
            chart.f5.dispose();
        }
        useDarkChart();
    } else {
        if (chart.f5 !== null) {
            chart.f5.dispose();
        }
        useLightChart();
    }
}

export {
    openRankingEnergyBoxView
}