<template>
  <div class="number">
    <ul id="dataNums" ref="dataNums">
      <li
        v-for="(item, index) in list"
        :key="index"
        :style="{ background: bgc }"
        :class="[index >= fristIndex ? '' : 'op']"
      >
        <div class="dataBoc">
          <div class="tt" :style="{ transition: 'all 2.5s ease-in-out 0s', top: '-' + item.top + 'px' }">
            <p v-for="(item2, index2) in numList" :key="index2">{{ item2 }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
const numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
const list = ref([]);
const fristIndex = ref(0);

const props = defineProps({
  number: String,
  bgc: String,
});

watch(
  () => props.number,
  async (val) => {
    findIndex();
    await nextTick();
    scroll();
    window.addEventListener('resize', scroll);
  }
);

function findIndex() {
  for (let index = 0; index < props.number.length; index++) {
    const element = props.number[index];
    if (Number(element > 0)) {
      fristIndex.value = index;
      break;
    }
  }
}

function scroll() {
  list.value = props.number.split('');
  let arr = [];
  list.value.forEach((value) => {
    arr.push({ num: value, top: 0 });
  });
  list.value = arr;
  let Hei = parseInt(getComputedStyle(document.getElementById('dataNums')).height);
  list.value.forEach((value, index) => {
    setTimeout(() => {
      value.top = value.num * Hei + Hei * 10;
    }, index * 300);
  });
}

onMounted(async () => {
  findIndex();
  await nextTick();
  scroll();
  window.addEventListener('resize', scroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', scroll);
});
</script>
<style scoped lang="scss">
.op {
  opacity: 0.5;
}
.number {
  text-align: center;
  ul {
    width: 100%;
    height: 50px;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    li {
      width: 34px;
      height: 50px;
      text-align: center;
      margin: 0 4px;
      border-radius: 4px;
      .dataBoc {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .tt {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          p {
            line-height: 50px;
            text-align: center;
            font-size: 44px;
            color: #fff;
            font-family: 'NumFont';
          }
        }
      }
    }
  }
}
</style>
