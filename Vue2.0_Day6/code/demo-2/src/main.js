import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
// 全局配置axios的请求根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
// 把axios挂载到Vue.prototype上，供每个.vue组件的实例直接使用
// '$http'不一定要是这个名称，也可以叫axios、http
Vue.prototype.$http = axios

// 在每个.vue组件中要发起请求，直接调用this.$http.xxx
// 缺点：把axios挂载到Vue原型上，不利于API接口的复用
new Vue({ render: (h) => h(App) }).$mount('#app')
