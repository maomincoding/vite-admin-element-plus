<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <div class="app-main" :key="key">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
</template>

<script setup>
import { getCurrentInstance, computed } from 'vue';
let { proxy } = getCurrentInstance();

const key = computed(() => {
  return proxy.$route.path;
});
const cachedViews = computed(() => {
  return proxy.$store.state.app.cachedViews;
});
</script>
<style scoped>
.app-main {
  /*60 = navbar  */
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 60px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
