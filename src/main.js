import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TableTemp from '@/components/table-temp.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from '@/app/axios/index'

Vue.prototype.$http = request

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('table-temp', TableTemp)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
