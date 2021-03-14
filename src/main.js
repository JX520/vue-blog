import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const {
//     mockXHR
//   } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

//分页
import Pagination from '@/components/Pagination'
Vue.component('Pagination', Pagination)

//公用样式
import '@/styles/common.scss'


//高亮代码
import hljs from 'highlight.js'
// import 'highlight.js/styles/googlecode.css' //样式文件
// import 'highlight.js/styles/atom-one-dark.css'
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})



//解析时间,重置表单
import {
  parseTime,
  resetForm,
  randomColor,
  randomNum
} from '@/utils/costum'

Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.randomColor = randomColor
Vue.prototype.randomNum = randomNum

//信息框提示
Vue.prototype.msgSuccess = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'success'
  })
}

Vue.prototype.msgError = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'error'
  })
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg)
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
