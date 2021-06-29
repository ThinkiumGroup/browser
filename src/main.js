import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from "./assets/style/global.scss";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n/langs';
import utils from './utils/index';
import '@/views/pc/theme/theme.scss'

import "@/filters/index";

import './assets/style/rem'















const params = location.href.split('?')[1]
if(params && params.includes('public')) {
  window.document.documentElement.setAttribute( "data-theme", 'public' );
} else {
  window.document.documentElement.setAttribute( "data-theme", 'default' );
}
Vue.config.productionTip = false;

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(utils)

new Vue({
  router,
  i18n,
  store,
  global,
  render: h => h(App)
}).$mount('#app')
