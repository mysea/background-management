import 'babel-polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'
import '@/styles/animate.css'

import VueI18n from 'vue-i18n'

import { Flexbox, FlexboxItem } from '@/components/flexbox'

import '@/permission'

Vue.use(VueI18n)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// 多语言
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    zh: Object.assign(require('@/common/lang/zh'), zhLocale),
    en: Object.assign(require('@/common/lang/en'), enLocale)
  }
})

Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
