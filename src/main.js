import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 吐司导入
import toast from 'components/common/toast'
// 移动端300延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)


Vue.use(toast)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

