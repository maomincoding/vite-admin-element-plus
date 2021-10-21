import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import 'amfe-flexible/index';
const app = createApp(App);

import '@/permission'; // permission control

import 'element-plus/dist/index.css';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import '@/styles/index.scss'; // global css
import '@/styles/font.css'; // font
import '@/styles/reset.css'; // reset
// import '@/icons/iconfont/iconfont.css'

import elementMixin from '@/mixins/elementMixin';
app.mixin(elementMixin);

import '@/globalUrl';

app.use(store).use(router).mount('#app');
