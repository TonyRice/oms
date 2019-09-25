import Vue from 'vue'
import OMS from './views/index.vue'
import store from './store/index.ts'

import 'normalize.css'

new Vue({
  store,
  render: h => h(OMS),
}).$mount('#app')
