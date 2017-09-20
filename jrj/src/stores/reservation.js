/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

// whatwg-fetch仅能在浏览器环境使用。
import 'whatwg-fetch'
import $ from 'jquery'

export default {
  namespaced: true,
  state: {
    // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更新
    type: true,
    err: null
  },
  mutations: {
    setData (state, res) {
      state.type = res
    },
    setError (state, err) {
      state.err = err
    }
  },
  // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    fetch ({ commit, rootState }, options) {
      $.ajax({
        url: 'http://activity.jrj.com.cn/activity/record/web',
        dataType: 'jsonp',
        data: {
          aid: options.aid,
          activityUserName: options.userName,
          mobile: options.phone,
          bizsource: options.bizsource,
          tgqdcode: options.tgqdcode,
          source: options.source
        },
        beforeSend: function () {
         // Handle the beforeSend event
          commit('setData', false)
        },
        success: function (data) {
          if (data.retcode === 0) {
            commit('setData', true)
          } else {
            commit('setError', {
              msg: data.msg
            })
          }
        },
        error: function (v) {
          alert('网络异常！')
        }
      })
    }
  }
}
