import Vue from 'vue'
import '@babel/polyfill'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import $ from 'jquery'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // element css
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control

import elDragDialog from '@/directive/el-drag-dialog' // drag
Vue.use(elDragDialog)

import api from '@/api' // api
Vue.use(api)

import axios from 'axios'
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios


function registerComponents (comp) {
  comp.keys().forEach(key => {
    const value = comp(key)
    const name = key.replace(/^\.\/(.*)\/\w+\.\w+$/, '$1') // 剥去文件名开头的 `./` 和结尾的扩展名
    Vue.component(name, value.default)
  })
}

registerComponents(require.context('./components', true, /\.vue$/))

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
