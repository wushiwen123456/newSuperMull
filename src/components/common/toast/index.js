// 导入组价Toast
import Toast from './Toast'

// 声明一个空对象
const obj = {}

// 添加install方法
obj.install = function(Vue){
  // 1.创建组件 构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.使用new，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是上面的div
  document.body.appendChild(toast.$el)

  // 5.在Vue原型中挂载使用
  Vue.prototype.$toast = toast 
}

export default obj
