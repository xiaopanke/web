/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

// whatwg-fetch仅能在浏览器环境使用。
// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import { domain } from '../z3tougu/config'

const PAGE_SIZE = 20

export default {
  namespaced: true,
  state: {
        // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更新
    keyword: '',
    result: {
      stock: null,
      theme: null,
      signal: null,
      infor: null,
      report: null
    },
    pagesize: PAGE_SIZE,
    page: 1,
    total: {
      stock: null,
      theme: null,
      signal: null,
      infor: null,
      report: null
    },
    isQuota: false
  },
  mutations: {
    setSearchOptions (state, options) {
      state.pagesize = options.pagesize || PAGE_SIZE
      state.page = options.page || 1
      state.keyword = options.keyword
    },
    setResult (state, options) {
      const result = options.result
      if (result.errCode === 0) {
        state.result = {
          ...state.result,
          [options.field]: result.data.list

        }
        state.total = {
          ...state.total,
          [options.field]: result.data.recordNum
        }
      } else {
        state.result = {
          ...state.result,
          [options.field]: null

        }
        state.total = {
          ...state.total,
          [options.field]: 0
        }
      }
    },
    setQuotaResult (state, result) {
      if (result.errCode === 0) {
        state.isQuota = result.data
      } else {
        state.isQuota = false
      }
    }
  },
    // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    search ({ commit }, { keyword, page, pagesize }) {
      commit('setSearchOptions', { keyword, page, pagesize })
      fetch(`${domain}/openapi/search/stock.shtml?w=${keyword}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setResult', {
          field: 'stock',
          result: body
        })
      })
      fetch(`${domain}/openapi/search/theme.shtml?w=${keyword}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setResult', {
          field: 'theme',
          result: body
        })
      })
      fetch(`${domain}/openapi/search/infor.shtml?w=${keyword}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setResult', {
          field: 'infor',
          result: body
        })
      })
      fetch(`${domain}/openapi/search/report.shtml?w=${keyword}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setResult', {
          field: 'report',
          result: body
        })
      })
      fetch(`${domain}/openapi/search/signal.shtml?w=${keyword}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setResult', {
          field: 'signal',
          result: body
        })
      })
    },
    quotaList ({ commit }, { keyword }) {
      return fetch(`${domain}/openapi/search/quota.shtml?w=${keyword}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setQuotaResult', body)
      })
    }
  }
}
