<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="breadcrumb-container">
      <message-notice />
    </div>

    <div class="right-menu">
      <time-date class="time-date"></time-date>
      <iosSwitch title="换肤" />
      <span class="iconfont icon-ren" title="用户"></span>
      <el-dropdown placement="bottom-start" @command="openSetUpView" trigger="click">
        <span class="iconfont icon-shezhi el-dropdown-link" title="设置"></span>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">关于软件</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="iconfont icon-guanji" @click="logout" title="退出系统"></span>
    </div>

    <dialogbox :width="'30%'" v-model:status="aboutView">
      <template v-slot:header>
        <p style="text-align: center">关于软件</p>
      </template>
      <template v-slot:default>
        <form-item :data="formList" />
      </template>
    </dialogbox>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, ref } from 'vue';
import { useStore } from 'vuex';
import Hamburger from '@/components/Hamburger';
import TimeDate from '@/components/TimeDate';
import MessageNotice from '@/components/MessageNotice';
import FormItem from '@/components/FormItem';
import Dialogbox from '@/components/Dialogbox';
import IosSwitch from '@/components/IosSwitch';

let { proxy } = getCurrentInstance();
const store = useStore();
const aboutView = ref(false);
const formList = [
  {
    name: '软件名称',
    txt: '物流中心综合管理系统',
  },
  {
    name: '软件版本',
    txt: 'V1.0.0',
  },
  {
    name: '授权方式',
    txt: '按年授权',
  },
  {
    name: '开始时间',
    txt: '2021年9月1日',
  },
  {
    name: '结束时间',
    txt: '2022年9月1日',
  },
];

let sidebar = computed(() => {
  return proxy.$store.getters.sidebar;
});

const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar');
};

const openSetUpView = (v) => {
  if (v === 'a') {
    aboutView.value = true;
  }
};

const logout = async () => {
  await proxy
    .elConfirmMixin('确定', `您确定要退出系统吗？`)
    .then(async () => {
      await store.dispatch('user/logout');
      proxy.$router.push(`/login`);
    })
    .catch((err) => console.error(err));
};
</script>

<style lang="scss" scoped>
.el-dropdown {
  height: 60px;
}
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  .hamburger-container {
    line-height: 52px;
    height: 100%;
    float: left;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
  }
  .right-menu {
    position: absolute;
    top: 0;
    right: 20px;
    height: 100%;
    padding-left: 20px;
    line-height: 60px;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .time-date {
      float: left;
      font-family: NumFont;
      color: #999999;
      font-size: 24px;
      margin-right: 30px;
    }
    .icon-ren,
    .icon-shezhi,
    .icon-guanji {
      color: #999999;
      font-size: 26px;
      margin-left: 30px;
      cursor: pointer;
    }
  }
}
</style>
