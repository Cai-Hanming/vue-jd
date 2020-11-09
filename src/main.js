import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'
import store from './store/'

// 把api接口都放在原型链上，更方便在组合中进行访问
import api from '@/utils/api'
Vue.prototype.$axios = api   // 通过 this.$axios 来访问

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
