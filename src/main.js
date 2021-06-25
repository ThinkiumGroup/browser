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
//  全局过滤器
import "@/filters/index";

import './assets/style/rem'
// var deviceWidth
// setHtmlFontSize()

// if (window.addEventListener) {
//   window.addEventListener('resize', function () {
//       setHtmlFontSize()
//   }, false)
// }
// function setHtmlFontSize () {
//   console.log('我调用了啊')
//   // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
//     deviceWidth = document.documentElement.clientWidth > 1366 ? 1366 : document.documentElement.clientWidth
//     document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 13.66 + 'px !important'
// }

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
