<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Layout',
};
</script>

<script setup>
import { Navbar, Sidebar, AppMain } from './components';
import { getCurrentInstance, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
let { proxy } = getCurrentInstance();

let opened = computed(() => {
  return store.getters.sidebar.opened;
});

let device = computed(() => {
  return store.getters.device;
});

let fixedHeader = computed(() => {
  return proxy.$store.state.settings.fixedHeader;
});

let classObj = computed(() => ({
  hideSidebar: !opened.value,
  openSidebar: opened.value,
  withoutAnimation: store.getters.sidebar.withoutAnimation,
  mobile: device.value === 'mobile',
}));

function handleClickOutside() {
  proxy.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
}

import ResizeMixin from './mixin/ResizeHandler';
ResizeMixin();
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 140px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
