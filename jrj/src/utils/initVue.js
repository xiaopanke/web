/*
 * 根据页面的配置，实例化vue对象
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from 'utils/configRouter'
import RoutedApp from 'components/routed-app'

/*
 * @route 页面的路由配置
 * @store 页面的数据仓库
 * @el 根节点选择器
 */
module.exports = function (opts) {
  const { route, store, el, component } = opts
  // 如果定义了路由配置，则用routed-app作为根组件
  if (route) {
    Vue.use(VueRouter)
    const transition = route.transition === undefined ? true : !!route.transition
    configRouter(route).then((router) => {
      const app = new Vue({
        template: `<App :animate=${transition}></App>`,
        components: {
          App: RoutedApp
        },
        router,
        store
      })
      app.$mount(el || 'app')
    })
  } else { // 否则使用app作为根组件
    const app = new Vue({
      template: '<App/>',
      components: {
        App: component
      },
      store
    })
    app.$mount(el || 'app')
  }
}
