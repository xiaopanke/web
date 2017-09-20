// whatwg-fetch仅能在浏览器环境使用。
import 'whatwg-fetch'
import { domain } from '../z3tougu/config'

export const types = {
  SET_SMARTPOOLLIST: 'SET_SMARTPOOLLIST',
  SET_SMARTPOOLLIST_DETAILS: 'SET_SMARTPOOLLIST_DETAILS',
  SET_RELEVANCEDATA: 'SET_RELEVANCEDATA',
  SET_FUNDPOOLHEAD: 'SET_FUNDPOOLHEAD'
}

export default{
  state: {
    smartPoolList: [],
    smartPoolListDetails: [],
    relevancedata: {},
    fundPoolHeadData: {}
  },
  getters: {
    smartPoolList: state => state.smartPoolList,
    smartPoolListDetails: state => state.smartPoolListDetails,
    relevancedata: state => state.relevancedata,
    fundPoolHeadData: state => state.fundPoolHeadData
  },
  mutations: {
    [types.SET_SMARTPOOLLIST] (state, list) {
      state.smartPoolList = list
    },
    [types.SET_SMARTPOOLLIST_DETAILS] (state, list) {
      state.smartPoolListDetails = list
    },
    [types.SET_RELEVANCEDATA] (state, list) {
      state.relevancedata = list
    },
    [types.SET_FUNDPOOLHEAD] (state, list) {
      state.fundPoolHeadData = list
    }
  },
  actions: {
    // 获取基金池列表
    getSmartPoolList ({ commit }, { isRecommend, userId, orgCode }) {
      const url = `${domain}/openapi/fund/showFundPool.shtml?isRecommend=${isRecommend}&userId=${userId}&orgCode=${orgCode}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          commit(types.SET_SMARTPOOLLIST, result.data)
        }
      })
    },
    // 获取基金池详情列表
    getSmartPoolListDetails ({ commit }, { id, orgCode }) {
      const url = `${domain}/openapi/fund/${id}.shtml?&orgCode=${orgCode}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          commit(types.SET_SMARTPOOLLIST_DETAILS, result.data)
        }
      })
    },
    // 获取基金池详情头部内容
    getSmartPoolListDetailsTop ({ commit }, { fundPoolId }) {
      const url = `${domain}/openapi/fund/fundPoolHead.shtml?fundPoolId=${fundPoolId}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          console.log(result)
          commit(types.SET_FUNDPOOLHEAD, result.data)
        }
      })
    },
    // 获取智能基金池相关数据
    relevancedatafn ({ commit }, { id }) {
      const url = `${domain}/openapi/fund/fundPoolRelevance.shtml?&poolId=${id}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          commit(types.SET_RELEVANCEDATA, result.data)
        }
      })
    }
  }
}
