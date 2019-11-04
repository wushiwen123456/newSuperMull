import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 吐司导入
import toast from 'components/common/toast'
// 移动端300延迟
import FastClick from 'fastclick'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
FastClick.attach(document.body)

Vue.use(toast)

Vue.use(VueLazyLoad,{
  loading: require('./assets/img/cart/timg.jpg')
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

