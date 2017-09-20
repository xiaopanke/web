/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

// whatwg-fetch仅能在浏览器环境使用。
import 'whatwg-fetch'

export default {
  namespaced: true,
  state: {
    // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更新
    shareTimes: 0,
    zuse: false
  },
  mutations: {
    fetch (state, data) {
      state.shareTimes = data.shareTimes
      state.zuse = data.zuse
    }
  },
  // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    fetch ({ commit, rootState }) {
      const requestAPI = function () {
        fetch('http://itougu.jrj.com.cn/marketing/getShareInfo.jspa?userId=' + rootState.user.ssoId + '&frm=h5').then((res) => {
          return res.json()
        }).then(body => {
          if (body.retCode === 0) {
            commit('fetch', body.data)
          } else if (body.retCode === -1) {
            commit('fetch', { shareTimes: 0, zuse: false })
          }
        }).catch((body2) => {
          commit('fetch', {
            shareTimes: 0,
            zuse: false
          })
        })
      }
      if (rootState.user.ssoId) {
        requestAPI()
      } else {
        const script = document.createElement('script')
        script.src = 'http://sso.jrj.com.cn/sso/json/userInfo.jsp'
        script.addEventListener('load', function () {
          requestAPI()
        })
        document.body.appendChild(script)
      }
    }
  }
}
