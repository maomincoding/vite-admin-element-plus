<template>
  <div class="top-date">
    <span class="top-date-vb top-date-v">{{ currentTime[0] * 365 + currentTime[1] }}</span>
    <span class="top-date-name">天</span>
    <span class="top-date-v top-date-vb">{{ currentTime[2] }}</span>
    <span class="top-date-name">时</span>
    <span class="top-date-vb top-date-v">{{ currentTime[3] }}</span>
    <span class="top-date-name">分</span>
    <span class="top-date-vo top-date-v">{{ currentTime[4] }}</span>
    <span class="top-date-name">秒</span>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
let currentTime = ref([0, 0, 0, 0, 0]);

let timer = null;
onMounted(() => {
  timer = setInterval(setTime, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer);
});

function toTwo(n) {
  return n < 10 ? `0${n}` : n;
}

function secondToDate(second) {
  if (!second) {
    return 0;
  }
  let time = new Array(0, 0, 0, 0, 0);
  if (second >= 365 * 24 * 3600) {
    //计算年
    time[0] = parseInt(second / (365 * 24 * 3600));
    second %= 365 * 24 * 3600;
  }
  if (second >= 24 * 3600) {
    //计算天
    time[1] = parseInt(second / (24 * 3600));
    second %= 24 * 3600;
  }
  if (second >= 3600) {
    //计算时
    time[2] = parseInt(second / 3600);
    second %= 3600;
  }
  if (second >= 60) {
    //计算分
    time[3] = toTwo(parseInt(second / 60));
    second %= 60;
  }
  if (second >= 0) {
    //计算秒
    time[4] = toTwo(second);
  }
  return time;
}

function setTime() {
  let create_time = Math.round(new Date(Date.UTC(2017, 0, 1, 0, 0, 0)).getTime() / 1000); //设置起始时间为2017年1月1日0点整，注意月份取值是0-11。
  let timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
  currentTime.value = secondToDate(timestamp - create_time);
}
</script>
<style lang="scss" scoped>
.top-date {
  font-family: 'PuHuiTi';
  .top-dateh {
    color: #f26a4f;
  }
  .top-date-vb {
    color: #4091c9;
  }
  .top-date-vo {
    color: #f26a4f;
  }
  .top-date-name {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 24px;
  }
  .top-date-v {
    font-size: 35px;
    font-family: 'NumFont';
    margin: 0 2px 0 8px;
  }
}
</style>
