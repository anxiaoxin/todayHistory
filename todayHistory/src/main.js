// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//设置HTML的字体大小
import set from './config/setFontSize'
set.setSize();

import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入状态管理vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import App from './App.vue'

//引入路由配置
import routes from './config/route'
//引入状态管理对象
import Store from './config/vuex'
//引入读取数据api
import api from './config/api'
Vue.prototype.$api = api;

const store = new Vuex.Store(Store)

const router = new VueRouter({routes})
router.beforeEach((to, from, next) => {
	next();
})


//定义jsonp回调，使用闭包
window.callback = function(data){
	store.dispatch("setData",data)
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App) //h函数是
})
