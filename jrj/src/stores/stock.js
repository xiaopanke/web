// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import config, { domain } from '../z3tougu/config'

// initial state
const state = {
  stockKlineData: [],
  stock: {
    stockCode: config.emptyValue,
    stockName: config.emptyValue,
    lastPx: config.emptyValue,
    chgPx: config.emptyValue,
    chgPctPx: config.emptyValue
  }
}

// getters
const getters = {

}

const mutationsTypes = {
  UPDATE_KLINE_DATA: 'UPDATE_KLINE_DATA',
  UPDATE_STOCK_MTK: 'UPDATE_STOCK_MTK'
}

    // actions
const actions = {
  queryKline ({ commit }, { stockCode }) {
    const url = `${domain}/openapi/filter/kLineMktOrMin.shtml?innerCode=${stockCode}&exstatus=0&flag=day&timeType=mkt`
    return fetch(url, { mode: 'cors', headers: { 'Cache-Control': 'no-cache' }}).then(res => res.json()).then((result) => {
      if (result.errCode === 0) {
        commit(mutationsTypes.UPDATE_KLINE_DATA, result.data.equityMktList)
      }
    })
  },
  queryMkt ({ commit }, { stockCode }) {
    const url = `${domain}/openapi/equity/${stockCode}.shtml`
    return fetch(url, { mode: 'cors', headers: { 'Cache-Control': 'no-cache' }}).then(res => res.json()).then((result) => {
      if (result.errCode === 0) {
        commit(mutationsTypes.UPDATE_STOCK_MTK, result.data)
      }
    })
  }
}

// mutations
const mutations = {
  [mutationsTypes.UPDATE_KLINE_DATA] (state, kline) {
    state.stockKlineData = kline
  },
  [mutationsTypes.UPDATE_STOCK_MTK] (state, stock) {
    state.stock = {
      stockCode: stock.innerCode,
      stockName: stock.name,
      lastPx: stock.price !== null ? stock.price.toFixed(2) : config.emptyValue,
      chgPx: stock.chg !== null ? stock.chg.toFixed(2) : config.emptyValue,
      chgPctPx: (stock.curChngPct !== null ? stock.curChngPct.toFixed(2) : config.emptyValue) + '%'
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
