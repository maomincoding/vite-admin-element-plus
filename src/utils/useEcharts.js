/**
 * 封装引入Echats
 * @param {Object} target
 * @param {string} el
 * @param {Object} option
 */

function useEchats(target, el, option) {
  const myChart = target.init(document.querySelector(el));
  myChart.setOption(option);
  return myChart;
}

export default useEchats;
