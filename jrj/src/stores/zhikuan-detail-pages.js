/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

// whatwg-fetch仅能在浏览器环境使用。
// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import { domain } from '../z3tougu/config'

export default {
  namespaced: true,
  state: {
    // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更新
    keyword: '',
    id: '',
    dataList: {
      news: null,
      report: null
    },
    isReportCanDown: false,
    downUrl: '',
    moreData: null

  },
  mutations: {
    setDetail (state, options) {
      const result = options.result
      if (result.errCode === 0) {
        state.dataList = {
          [options.field]: result.data
        }
      } else {
        state.dataList = {
          [options.field]: null
        }
      }
    },
    setDetailOptions (state, options) {
      state.id = options.id
    },
    setReport (state, result) {
      if (result.errCode === 0) {
        state.isReportCanDown = true
      } else {
        state.isReportCanDown = false
      }
    },
    setRelateNews (state, result) {
      if (result.errCode === 0) {
        state.moreData = result.data
      } else {
        state.moreData = null
      }
    },
    setTopicRelateNews (state, result) {
      if (result.errCode === 0) {
        state.moreData = result.data.content
      } else {
        state.moreData = null
      }
    }
  },
    // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    getDetailPages ({ commit }, { id, detailType }) {
      commit('setDetailOptions', { id })
      return fetch(`${domain}/openapi/${detailType}/${id}.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setDetail', {
          field: detailType,
          result: body
        })
      })
    },
    checkDownReport ({ commit }, { id }) {
      return fetch(`${domain}/openapi/report/checkDownReportFile/${id}.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setReport', body)
      })
    },
    getInforRelate ({ commit }, { id, innerCode }) {
      return fetch(`${domain}/openapi/relatedNews/${id}.shtml?innerCode=${innerCode}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setRelateNews', body)
      })
    },
    getTopicRelate ({ commit }, { topicCode }) {
      return fetch(`${domain}/openapi/news/topic/${topicCode}.shtml?page=0&size=3`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setTopicRelateNews', body)
      })
    }

  }
}
