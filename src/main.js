import Vue from 'vue'
import App from './App.vue'
import router from './router'
import global from '@/utils/global'
import './styles/style.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.$global = global
Vue.use(ElementUI)
window.String.prototype.pxToVW = function () {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const ratio = clientWidth ? clientWidth / 1920 : 1
  const size = Number(this) * ratio
  return size
}

window.String.prototype.pxToVH = function () {
  const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const ratio = clientHeight ? clientHeight / 1080 : 1
  const size = Number(this) * ratio
  return size
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
