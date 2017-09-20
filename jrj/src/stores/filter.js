import 'whatwg-fetch'
import { domain } from '../z3tougu/config'
const PAGE_SIZE = 10

export const types = {
  ADD_FUNDPOLL: 'ADD_FUNDPOLL'
}
export default {
  state: {
    topic: null,
    lsfoundPoolList: [],
    foundPoolList: [],
    maskShow: true,
    page: 0,
    total: 0,
    pagesize: PAGE_SIZE,
    sylbx: [], // 收益率表现
    nhsyl: [], // 年化收益率
    zdhc: [], // 最大回撤
    xpb: [], // 夏普率
    cesyl: [], // 超额收益率
    number: 0,
    numberOfElements: 20,
    fundNum: 0, // 基金总条数，
    foundPoolListLength: 0
  },
  getters: {
    foundPoolList: state => state.foundPoolList,
    lsfoundPoolList: state => state.lsfoundPoolList,
    themeList: state => state.themeList,
    relatedStocks: state => state.relatedStocks,
    sylbx: state => state.sylbx,
    nhsyl: state => state.nhsyl,
    zdhc: state => state.zdhc,
    xpb: state => state.xpb,
    cesyl: state => state.cesyl,
    totalPage: state => state.total,
    number: state => state.number,
    numberOfElements: state => state.numberOfElements,
    fundNum: state => state.fundNum,
    page: state => state.page,
    pagesize: state => state.pagesize,
    foundPoolListLength: state => state.foundPoolListLength,
    maskShow: state => state.maskShow
  },
  mutations: {
    [types.ADD_FUNDPOLL] (state, list) {
      state.foundPoolList = list.fundList.content
      state.number = list.fundList.number
      state.numberOfElements = list.fundList.numberOfElements
      state.fundNum = list.fundNum
      state.foundPoolListLength = list.fundList.content.length
    },
    getLSFoundPoolList (state, list) {
      state.lsfoundPoolList = list
    },
    upDataPage (state, options) {
      state.pagesize = options.pageSize || PAGE_SIZE
      state.page = options.page || 1
      state.total = options.totalPages
    },
    getSylbx (state, options) {
      state.sylbx = options
    },
    getNhsyl (state, options) {
      state.nhsyl = options
    },
    getZdhc (state, options) {
      state.zdhc = options
    },
    getXpb (state, options) {
      state.xpb = options
    },
    getCesyl (state, options) {
      state.cesyl = options
    },
    setMask (state, type) {
      state.maskShow = type
    }
  },
  actions: {
    // 获取查询数据
    getFundPool ({ commit }, { type, option, isConsignment, searchVal, page, pageSize, orgCode, sort }) {
      commit('setMask', true)
      const url = `${domain}/openapi/fund/strategyByParam.shtml?jjlx=${type}&jyzt=${option.jyzt}&sort=${sort}&jjgm=${option.jjgm}&clsj=${option.clsj}&dexz=${option.dexz}&sylbx1=${option.sylbx1}&sylbx2=${option.sylbx2}&nhsyl=${option.nhsyl}&hy=hy_${option.hy}&tzfg=${option.tzfg}&jhfxq=${option.jhfxq}&zdhc=${option.zdhc}&xpb=${option.xpb}&cesyl=${option.cesyl}&fbq=${option.fbq}&isConsignment=${isConsignment}&searchVal=${searchVal}&page=${page}&pageSize=${pageSize}&orgCode=${orgCode}`
      return fetch(url, { method: 'POST', mode: 'cors' }).then((res) => {
        return res.json()
      }).then(result => {
        console.log(result)
        if (result.errCode === 0) {
          commit('setMask', false)
          commit(types.ADD_FUNDPOLL, result.data)
          commit('upDataPage', { page: result.data.fundList.number, pageSize: result.data.fundList.size, totalPages: result.data.fundList.totalPages })
        }
      }).catch(v2 => {
        console.log(v2)
      })
    },
    // 收益率表现
    getSylbx ({ commit }, { idxId, jjlx }) {
      const url = `${domain}/openapi/fund/indexlist.shtml?idxId=${idxId}&jjlx=${jjlx}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then(res => {
        return res.json()
      }).then(result => {
        commit('getSylbx', result.data)
      })
    },
     // 年化收益率
    getNhsyl ({ commit }, { idxId, jjlx }) {
      const url = `${domain}/openapi/fund/indexlist.shtml?idxId=${idxId}&jjlx=${jjlx}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then(res => {
        return res.json()
      }).then(result => {
        commit('getNhsyl', result.data)
      })
    },
    // 最大回撤
    getZdhc ({ commit }, { idxId, jjlx }) {
      const url = `${domain}/openapi/fund/indexlist.shtml?idxId=${idxId}&jjlx=${jjlx}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then(res => {
        return res.json()
      }).then(result => {
        commit('getZdhc', result.data)
      })
    },
    // 夏普率
    getXpb ({ commit }, { idxId, jjlx }) {
      const url = `${domain}/openapi/fund/indexlist.shtml?idxId=${idxId}&jjlx=${jjlx}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then(res => {
        return res.json()
      }).then(result => {
        commit('getXpb', result.data)
      })
    },
     // 超额收益率
    getCesyl ({ commit }, { idxId, jjlx }) {
      const url = `${domain}/openapi/fund/indexlist.shtml?idxId=${idxId}&jjlx=${jjlx}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then(res => {
        return res.json()
      }).then(result => {
        commit('getCesyl', result.data)
      })
    }
  }
}
