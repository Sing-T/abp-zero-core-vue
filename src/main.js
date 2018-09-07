import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import abpObj from '@/lib/abp'
import extend from '@/lib/extend'
import request from '@/utils/request'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

request({
  url: '/AbpUserConfiguration/GetAll',
  method: 'get'
}).then(data => {
  abpObj.abp = extend(true, abpObj.abp, data.result)
  new Vue({
    router,
    store,
    // async mounted() {
    //   // this.currentPageName = this.$route.name as string;
    //   await this.$store.dispatch({
    //     type: 'session/init'
    //   })
    //   if (!!this.$store.state.session.user && this.$store.state.session.application.features['SignalR']) {
    //     if (this.$store.state.session.application.features['SignalR.AspNetCore']) {
    //       // SignalRAspNetCoreHelper.initSignalR()
    //     }
    //   }
    // },
    render: h => h(App)
  }).$mount('#app')
})
