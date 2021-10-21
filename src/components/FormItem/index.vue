<template>
  <ul class="form-list">
    <li v-for="item in data" :key="item.name">
      <p>{{ item.name }}</p>
      <p :class="[isAlarm ? color[data[5].txt] : '']">{{ item.txt }}</p>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  data: Array,
  isAlarm: {
    default: false,
    type: Boolean,
  },
});
const color = {
  红色报警: 'red',
  橙色预警: 'orange',
  黄色预警: 'yellow',
  蓝色预警: 'blue',
};
</script>
<style lang="scss" scoped>
.form-list {
  font-family: 'PuHuiTi';
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  border: 1px solid #eaeaea;
  margin-top: 10px;
  li {
    display: flex;
    justify-content: space-between;
    &:nth-child(5) {
      .red {
        color: #d71345;
      }
      .orange {
        color: #f26a4f;
      }
      .yellow {
        color: #ffd400;
      }
      .blue {
        color: #409eff;
      }
    }

    &:nth-child(odd) {
      background: #f8f8f8;
    }
    &:nth-child(even) {
      background: #fff;
    }
    & > p:nth-child(1) {
      width: 20%;
      text-align: center;
      color: #999999;
      border-right: 1px solid #eaeaea;
    }
    & > p:nth-child(2) {
      width: 80%;
      color: #333333;
      padding-left: 20px;
    }
  }
}
</style>
