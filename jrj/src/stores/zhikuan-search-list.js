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
    pagesize: PAGE_SIZE,
    dataList: null,
    totalRecordNum: 0,
    totalPage: {
      totalPageStock: 0,
      totalPageTheme: 0,
      totalPageSignal: 0,
      totalPageInfor: 0,
      totalPageReport: 0
    },
    currentPage: 1,
    sortType: 1
  },
  mutations: {
    setResult (state, option) {
      const result = option.result
      if (result.errCode === 0) {
        state.dataList = result.data.data.list
        state.totalRecordNum = result.data.data.recordNum
        state.totalPage = {
          [option.field]: result.data.totalPage
        }
      } else {
        state.dataList = null
        state.totalRecordNum = 0
        state.totalPage = {
          [option.field]: 0
        }
      }
    },
    setSearchOptions (state, options) {
      state.pagesize = options.pagesize || PAGE_SIZE
      state.keyword = options.keyword
      state.currentpage = options.currentPage || 1
      state.sortType = options.sortType || 1
    }
  },
    // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    searchList ({ commit }, { keyword, currentPage, sortType, linkText }) {
      commit('setSearchOptions', { keyword, currentPage, sortType, linkText })
      return fetch(`${domain}/openapi/search/${linkText}/list.shtml?w=${keyword}&page=${currentPage || 1}&ss=${sortType || 1}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setResult', {
          field: linkText,
          result: body
        })
      })
    }
  }
}
