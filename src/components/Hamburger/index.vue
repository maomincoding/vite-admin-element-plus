<template>
  <div class="hamburger-box" @click="toggleClick">
    <div :class="['hamburger', isActive ? '' : 'is-active']">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
let { proxy } = getCurrentInstance();
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
const toggleClick = () => {
  proxy.$emit('toggleClick');
};
</script>

<style lang="scss" scoped>
.hamburger-box {
  padding: 0 20px;
}
.hamburger:hover .line {
  width: 26px;
}
.hamburger {
  margin-top: 22px;
  transition: all 0.3s ease-in-out 0s;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
}
.line {
  background: #000;
  display: block;
  height: 3px;
  border-radius: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &:nth-child(1),
  &:nth-child(2) {
    width: 26px;
  }
  &:nth-child(3) {
    width: 15px;
  }
}

.hamburger.is-active .line {
  background-color: #000;
}
.hamburger.is-active .line:nth-child(1) {
  transform: translateY(4px) translateX(16px) rotate(45deg);
}
.hamburger.is-active .line:nth-child(2) {
  transform: translateX(0px);
  width: 22px;
  height: 3px;
}
.hamburger.is-active .line:nth-child(3) {
  transform: translateY(-4px) translateX(16px) rotate(-45deg);
}
.hamburger.is-active .line:nth-child(2) {
  width: 26px;
}
.hamburger.is-active .line:nth-child(1),
.hamburger.is-active .line:nth-child(3) {
  width: 14px;
  height: 3px;
}
</style>
