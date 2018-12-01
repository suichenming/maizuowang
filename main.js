import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
Vue.prototype.$pubsub = new Vue();

import AppContent from './common/AppContent.vue'
Vue.component('app-content',AppContent)



//时间过滤器

import {formatdate} from './filter/datefilter'
Vue.filter('a',formatdate)


new Vue({
    el:"#app",
    router,
    store,
    components:{
        App
    },
    render:h=>h(App)
})