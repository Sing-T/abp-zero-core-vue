import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import { abpObj, extend } from '@/lib/abp'
import request from '@/utils/request'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

request({
  url: '/AbpUserConfiguration/GetAll',
  method: 'get'
}).then(data => {
  // Util.abp = Util.extend(true, Util.abp, data.data.result)
  abpObj.abp = extend(true, abpObj.abp, data.result.data)
  new Vue({
    // el: '#app',
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
/* new Vue({
    render: h => h(App),
    router:router,
    store:store,
    data: {
      currentPageName: ''
    },
    async mounted () {
      this.currentPageName = this.$route.name as string;
      await this.$store.dispatch({
        type:'session/init'
      })
      if(!!this.$store.state.session.user&&this.$store.state.session.application.features['SignalR']){
        if (this.$store.state.session.application.features['SignalR.AspNetCore']) {
            SignalRAspNetCoreHelper.initSignalR();
        }
      }
      this.$store.commit('app/initCachepage');
      this.$store.commit('app/updateMenulist');
    },
    created () {
      let tagsList:Array<any> = [];
      appRouters.map((item) => {
          if (item.children.length <= 1) {
              tagsList.push(item.children[0]);
          } else {
              tagsList.push(...item.children);
          }
      });
      this.$store.commit('app/setTagsList', tagsList);
    }
  }).$mount('#app')
})*/

