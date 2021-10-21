<template>
  <input class="ios-switch" type="checkbox" @change="useChange" v-model="status" />
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import setTheme from '@/setTheme';

const store = useStore();
const status = ref(false);
const theme = computed(() => store.getters.theme);
const sidebar = computed(() => store.getters.sidebar);

const useChange = () => {
  status.value ? setTheme('dark') : setTheme('light');
  store.dispatch('app/toggleTheme', status.value);
};

watch(
  () => theme,
  (val, prevVal) => {
    if (!sidebar.opened) {
      store.dispatch('app/toggleSideBar');
    }
  }
);
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 31px;
  width: 54px;
  height: 22px;
  background-color: #e9e9eb;
}
.ios-switch {
  position: relative;
  appearance: none;
  cursor: pointer;
  transition: all 100ms;
  @extend .btn;
  &::before {
    position: absolute;
    content: '';
    transition: all 300ms cubic-bezier(0.45, 1, 0.4, 1);
    @extend .btn;
  }
  &::after {
    position: absolute;
    left: 4px;
    top: 2px;
    border-radius: 27px;
    width: 18px;
    height: 18px;
    background-color: #fff;
    box-shadow: 1px 1px 5px rgba(#000, 0.3);
    content: '';
    transition: all 300ms cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  &:checked {
    background-color: #333;
    &::before {
      transform: scale(0);
    }
    &::after {
      transform: translateX(28px);
      background-color: #444;
    }
  }
}
</style>
