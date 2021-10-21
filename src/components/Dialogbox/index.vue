<template>
  <el-dialog
    v-model="visible"
    :width="width"
    :show-close="false"
    custom-class="dialog-box"
    :append-to-body="true"
    top="5vh"
  >
    <template #title>
      <div class="header-box">
        <slot name="header"></slot>
        <span class="iconfont icon-guanbi" @click="closeView"></span>
      </div>
    </template>

    <div class="body-box" id="dialogid-box">
      <slot></slot>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue';
let { proxy } = getCurrentInstance();
defineProps({
  status: Boolean,
  width: String,
});

let visible = computed({
  get: () => proxy.status,
  set: (val) => {
    proxy.$emit('update:status', val);
  },
});
function closeView() {
  visible.value = false;
}
</script>
<style lang="scss" scoped>
.dialog-box {
  background: #ffffff;
  border-radius: 10px;
  .header-box {
    position: relative;
    font-size: 20px;
    font-family: 'PuHuiTi';
    font-weight: 400;
    font-size: 20px;
    color: #333333;
    .icon-guanbi {
      font-size: 26px;
      color: #999999;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .body-box {
    padding: 0 20px 20px 20px;
  }
  ::deep(.el-dialog__body) {
    padding: 0 20px 20px 20px;
  }
}
</style>
