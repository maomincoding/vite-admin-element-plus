<template>
  <!-- :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText" -->
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" class="side-padding">
      <el-menu :default-active="activeMenu" :collapse="!isCollapse" :unique-opened="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';

const store = useStore();
const route = useRoute();

let routes = computed(() => {
  return store.state.permission.routes;
});

const isCollapse = computed(() => {
  return store.state.app.sidebar.opened;
});

const activeMenu = computed(() => {
  const { meta, fullPath } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return fullPath;
});

const showLogo = computed(() => {
  return store.state.settings.sidebarLogo;
});
</script>
<style lang="scss" scoped>
.side-padding {
  padding: 20px 0;
}
</style>
