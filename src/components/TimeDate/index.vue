<template>
  <div class="time">
    <span>{{ dateTxt }}</span>
    <span class="timeTxt">{{ timeTxt }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const timeName = ref(null);
const dateTxt = ref('');
const timeTxt = ref('');

function toTwo(n) {
  return n < 10 ? `0${n}` : n;
}

function getCurrentDate() {
  const myDate = new Date();
  let year = myDate.getFullYear(); //年
  let month = toTwo(myDate.getMonth() + 1); //月
  let day = toTwo(myDate.getDate()); //日
  let days = myDate.getDay(); //星期
  let hours = toTwo(myDate.getHours()); //时
  let minutes = toTwo(myDate.getMinutes()); //分
  let seconds = toTwo(myDate.getSeconds()); //秒
  switch (days) {
    case 1:
      days = '星期一';
      break;
    case 2:
      days = '星期二';
      break;
    case 3:
      days = '星期三';
      break;
    case 4:
      days = '星期四';
      break;
    case 5:
      days = '星期五';
      break;
    case 6:
      days = '星期六';
      break;
    case 0:
      days = '星期日';
      break;
  }

  let str = `${year}-${month}-${day}`;
  let str1 = hours + ':' + minutes + ':' + seconds;
  dateTxt.value = str;
  timeTxt.value = str1;
}

onMounted(() => {
  getCurrentDate();
  timeName.value = setInterval(() => {
    getCurrentDate();
  }, 1000);
});

onBeforeUnmount(() => {
  timeName.value = null;
  clearInterval(timeName);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timeTxt {
  margin-left: 10px;
}
</style>
