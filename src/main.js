import Vue from 'vue'
import '@/utils/rem'
import 'normalize.css/normalize.css'
import { mixins } from '@/utils/auth'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { showErrorInfo, showSuccessInfo, showErrorType } from '@/utils/index'

Object.assign(Vue.prototype, { showErrorInfo, showSuccessInfo, showErrorType })

import '@/styles/index.scss'
import '@/styles/variables.scss'

import App from './App'
import router from './router'
import store from './store'

import '@/icons'
import '@/permission'
import '@/utils/filter'
import jquery from 'jquery'

// require('echarts')
// import ECharts from 'vue-echarts/components/ECharts'
// Vue.component('chart', ECharts)

Vue.use(ElementUI, { size: 'small' })

if (process.env.NODE_ENV === 'development') {
  // require('./mock')
}

Vue.config.productionTip = false

Vue.mixin(mixins)

new Vue({
  el: '#app',
  router,
  store,
  jquery,
  template: '<App/>',
  components: { App }
})
