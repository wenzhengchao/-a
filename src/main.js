import Vue from 'vue'
import App from './App.vue'
import mint from 'mint-ui'
import router from './router'
import './css/mui.min.css'
import '../node_modules/mint-ui/lib/style.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import store from './store'
import '../reset.css'
import axios from 'axios'
import vuelazyload from 'vue-lazyload'
axios.defaults.baseURL = 'http://192.168.1.100:3000/'
Vue.prototype.$http = axios
Vue.use(mint)
Vue.use(Vant)
Vue.use(vuelazyload)

Vue.config.productionTip = false
Vue.filter('time', function (time) {
  if (time > 10000) {
    time = parseInt(time / 10000) + '万'
  }
  return time
})
Vue.filter('time2', function (time) {
  var m = parseInt(time / 1000 / 60)
  var s = parseInt(time / 1000 % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
