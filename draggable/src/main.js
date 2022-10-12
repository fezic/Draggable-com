import Vue from 'vue'
import App from './App.vue'
import ComMap from './utils/generateCom'
Vue.config.productionTip = false
Vue.use(ComMap)
new Vue({
  render: h => h(App),
}).$mount('#app')
