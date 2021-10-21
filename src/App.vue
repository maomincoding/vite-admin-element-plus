<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
export default {
  name: 'App',
  setup() {
    return {
      locale: zhCn,
    };
  },
};
</script>
