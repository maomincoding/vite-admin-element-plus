<template>
  <div class="app-container comElectricityCharge">
    <ul class="dashboard-top">
      <li class="card-box">
        <div class="top-tit text">电费总数</div>
        <div class="num-move-box">
          <NumMove :number="'000008'" :bgc="'#4091c9'" />
        </div>
      </li>
      <li class="card-box">
        <div class="top-tit">当月电费</div>
        <div class="num-move-box">
          <NumMove :number="'002008'" :bgc="'#F26A4F'" />
        </div>
      </li>
      <li class="card-box top-thbox">
        <div>
          <p>
            <span class="top-tit">同比</span>
            <span class="top-timedate">2020年8月</span>
          </p>
          <p>
            <span class="top-tit">环比</span>
            <span class="top-timedate">2021年7月</span>
          </p>
        </div>
        <div>
          <p>
            <span class="top-tbv">2.8%</span>
            <span class="iconfont icon-jiantou-shang icon-m"></span>
          </p>
          <p>
            <span class="top-hbv">2.8%</span>
            <span class="iconfont icon-jiantou-xia icon-m"></span>
          </p>
        </div>
      </li>
      <li class="card-box">
        <div class="top-tit">安全监测</div>
        <CountTime />
      </li>
    </ul>
    <div class="dashboard-center card-box">
      <ul class="list-header">
        <li v-for="item in listHeader" :key="item">{{ item }}</li>
        <li>
          <p>当前电费</p>
          <p>(￥)</p>
        </li>
        <li>
          <p>当月电费</p>
          <p>(￥)</p>
        </li>
        <li>
          <p>电费环比</p>
          <p>2021年7月</p>
        </li>
      </ul>
      <ul class="list-inner">
        <li v-for="item in deviceData" :key="item.id">
          <p><span :class="['iconfont', item.icon]"></span></p>
          <p class="top-tit">{{ item.name }}</p>
          <p class="top-tit">{{ item.currentVal }}</p>
          <p class="top-tit">{{ item.currentMonthVal }}</p>
          <p class="top-hbv top-tit">
            <span class="iconfont icon-jiantou-shang icon-mr"></span>
            <!-- <span class="iconfont icon-jiantou-xia icon-mr"></span> -->
            {{ item.cycleRatio }}
          </p>
        </li>
      </ul>
    </div>
    <div class="dashboard-footer">
      <div class="card-box">
        <div class="dashboard-footerChart-tit">
          <p class="top-tit">电费占比</p>
          <span class="iconfont icon-tongji" @click="useRankingEnergyBoxView"></span>
        </div>
        <div class="dashboard-footer-item1"></div>
      </div>
      <div class="card-box">
        <div class="dashboard-footerChart-tit">
          <p class="top-tit">电费统计</p>
        </div>
        <div class="dashboard-footer-item2"></div>
      </div>
      <div class="card-box">
        <div class="dashboard-footerChart-tit">
          <p class="top-tit">电费分析</p>
          <span class="iconfont icon-zhexiantu" @click="usePueTrendView"></span>
        </div>
        <div class="dashboard-footer-item3"></div>
      </div>
    </div>
    <Dialogbox v-model:status="rankingEnergyBoxView" :width="'40%'">
      <template v-slot:header>
        <p style="text-align: center">电费占比排行</p>
      </template>
      <template v-slot:default>
        <div class="ranking-energy-box" ref="rankingEnergyBox">
          <div class="ranking-energy"></div>
        </div>
      </template>
    </Dialogbox>
    <Dialogbox v-model:status="pueTrendView" :width="'40%'">
      <template v-slot:header>
        <p style="text-align: center">电费PUE曲线图</p>
      </template>
      <template v-slot:default>
        <div class="radio-group">
          <el-radio-group v-model="checkPueTrendChat" class="check-pue-trend">
            <el-radio :label="0">年</el-radio>
            <el-radio :label="1">月</el-radio>
            <el-radio :label="2">日</el-radio>
          </el-radio-group>
        </div>
        <div class="pue-trend"></div>
      </template>
    </Dialogbox>
  </div>
</template>
<script setup>
import { computed, ref, reactive, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import store from '@/store';
import NumMove from '@/components/NumMove';
import Dialogbox from '@/components/Dialogbox';
import CountTime from '@/components/CountTime';
import useEcharts from '@/utils/useEcharts.js';

import {
  useReChart,
  useResize,
  getF1ChartOption,
  getF1DarkChartOption,
  getF2ChartOption,
  getF2DarkChartOption,
  getF3ChartOption,
  openRankingEnergyBoxView,
  openPueTrendView,
} from './methods';

const listHeader = ['设备图标', '设备名称'];
let rankingEnergyBoxView = ref(false);
let pueTrendView = ref(false);
let checkPueTrendChat = ref(1);
let rankingEnergyBox = ref(null);
let deviceData = reactive([
  {
    id: '1',
    icon: 'icon-zhaoming',
    name: '照明',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '2',
    icon: 'icon-dianti',
    name: '电梯',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '3',
    icon: 'icon-kongtiao',
    name: '空调',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '4',
    icon: 'icon-lengku',
    name: '冷库',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '5',
    icon: 'icon-shengchanxianlu',
    name: '生产线',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '6',
    icon: 'icon-shuibeng',
    name: '水泵',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '7',
    icon: 'icon-shuibeng',
    name: '消防',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '8',
    icon: 'icon-fengji',
    name: '风机',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '9',
    icon: 'icon-kongtiaojizu',
    name: '空调机组',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
  {
    id: '10',
    icon: 'icon-lengqueta',
    name: '冷却塔',
    currentVal: '8888',
    currentMonthVal: '888.0',
    cycleRatio: '15%',
  },
]);
let chart = reactive({
  f1: null,
  f2: null,
  f3: null,
  f5: null,
  f6: null,
});

let theme = computed(() => store.getters.theme);

watch(theme, (theme) => {
  // 暗黑主题
  if (theme.value) {
    // 能耗占比
    useReChart(chart.f1);
    nextTick(() => {
      chart.f1 = useEcharts(echarts, '.dashboard-footer-item1', getF1DarkChartOption());
    });

    // 能耗统计
    useReChart(chart.f2);
    nextTick(() => {
      chart.f2 = useEcharts(echarts, '.dashboard-footer-item2', getF2DarkChartOption());
    });
  }
  // 亮色主题
  else {
    // 能耗占比
    useReChart(chart.f1);
    nextTick(() => {
      chart.f1 = useEcharts(echarts, '.dashboard-footer-item1', getF1ChartOption());
    });

    // 能耗统计
    useReChart(chart.f2);
    nextTick(() => {
      chart.f2 = useEcharts(echarts, '.dashboard-footer-item2', getF2ChartOption());
    });
  }
});

onMounted(() => {
  nextTick(() => {
    chart.f1 = useEcharts(echarts, '.dashboard-footer-item1', getF1ChartOption());
    chart.f2 = useEcharts(echarts, '.dashboard-footer-item2', getF2ChartOption());
    chart.f3 = useEcharts(echarts, '.dashboard-footer-item3', getF3ChartOption());
  });
  window.addEventListener('resize', () => {
    useResize(chart);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    useResize(chart);
  });
});

// 能耗占比排行
let useRankingEnergyBoxView = () => {
  openRankingEnergyBoxView({ rankingEnergyBoxView, chart, theme, rankingEnergyBox });
};

// 能耗PUE
let usePueTrendView = () => {
  openPueTrendView({ pueTrendView, chart, theme });
};
</script>
<style src="./style/index.scss" lang="scss" scoped></style>
