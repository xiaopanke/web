/*
 * 前端页面入口文件
 */

import Vue from 'vue'
import Vuex from 'vuex'
import initVue from 'utils/initVue'
import dadianapp from 'components/dadianapp'
import dadianweb from 'components/dadianweb'

/*
 * 引入vuex
 */
Vue.use(Vuex)

/*
 * 定义路由
 */
const routes = [{
    path: '/dadianapp',
    component: dadianapp
  },
  {
    path: '/dadianweb',
    component: dadianweb
  }
]
/*
 * 实例化store
 */
import user from 'stores/user'
import error from 'stores/error'
const store = new Vuex.Store({
  modules: {
    user,
    error
  }
})

/*
 * 实例化vue对象，渲染页面
 * @store  vuex的数据仓库
 * @component  用于渲染的组件
 */
initVue({
  store,
  routes
})