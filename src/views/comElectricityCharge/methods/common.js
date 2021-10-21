// 图表重置
function useReChart(chart) {
    if (chart !== null) {
        chart.dispose();
    }
}
// 图表自适应
function useResize(chart) {
    chart.f1.resize();
    chart.f2.resize();
    chart.f3.resize();
}

export {
    useReChart,
    useResize
}