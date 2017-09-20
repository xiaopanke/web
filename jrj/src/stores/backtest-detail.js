/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

// whatwg-fetch仅能在浏览器环境使用。
// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import { domain } from '../z3tougu/config'

const STOCK_PAGE_SIZE = 10
const TRADE_PAGE_SIZE = 10

export default {
  namespaced: true,
  state: {
        // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更

    basicFilter: {// 筛股页头部
      strategyId: '',
      strategyName: '',
      strategyDesc: '',
      filterParams: '',
      createDate: '',
      backtestStartDate: '',
      backtestEndDate: '',
      holdDay: '',
      evaluationIndexs: {},
      filterSummary: {}
    },
    tradeDetail: [], // 当日交易
    nowStock: [], // 当前选股
    timeStrategy: {
      strategyId: '',
      strategyName: '',
      strategyDesc: '',
      createDate: '',
      backtestStartDate: '',
      backtestEndDate: '',
      buyStrategyIndexList: [],
      sellStrategyIndexList: [],
      buyConExp: '',
      sellConExp: '',
      evaluationIndexs: {}

    },
    kLineData: {},
    stockPage: 0,
    stockPageSize: STOCK_PAGE_SIZE,
    stockTotal: 0,
    tradePage: 0,
    tradePageSize: TRADE_PAGE_SIZE,
    tradeTotalPage: 0,
    searchList: []
    /* evaluationIndexs: {
      winRatio:'',
      avgReturnExcess:'',
      avgReturn:'',
      winLossRatio:'',
      holdDay:'',
      maxWin:'',
      maxLoss:''
    },*/

  },
  mutations: {
    updateBasicFilter (state, filterdetail) {
      console.log(filterdetail.filterSummary)
      state.basicFilter = filterdetail
      state.basicFilter.filterSummary = JSON.parse(filterdetail.filterSummary)
    },
    updateTradeDetail (state, tradeDetail) {
      state.tradeDetail = tradeDetail
    },
    updateNowStock (state, stock) {
      state.nowStock = stock
    },
    updateTimeStrategy (state, timestra) {
      // console.log(timestra)
      state.timeStrategy = timestra
      // console.log(state.timeStrategy.buyStrategyIndexList[0].indexParams)
    },
    updateKline (state, kLineData) {
      // console.log(kLineData)
      state.kLineData = kLineData
    },
    updateStockPage (state, options) {
      console.log(options.totalPages)
      state.stockTotal = options.totalPages
    },
    updateTradePage (state, options) {
      console.log(options.totalPages)
      state.tradeTotalPage = options.totalPages
    },
    updateSearch (state, search) {
      state.searchList = search
    }
  },
    // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    queryBasicFilter ({ commit }, { strategyId }) {
      fetch(`${domain}/openapi/backtest/filterStrategy/basicAndIndex.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data)
          // console.log(result.data.evaluationIndexs.winRatio)
          commit('updateBasicFilter', result.data)
        }
      })
    },
    queryTradeDetail ({ commit }, { tradePage, tradePagesize, tradeTotalPages, strategyId }) {
      fetch(`${domain}/openapi/backtest/filterStrategy/tradeDetail.shtml?strategyId=${strategyId}&size=${tradePagesize}&page=${tradePage}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data)
          commit('updateTradeDetail', result.data.content)
          commit('updateTradePage', { totalPages: result.data.totalPages })
        }
      })
    },
    queryNowStock ({ commit }, { stockPage, stockPagesize, totalPages, strategyId }) {
      stockPage = stockPage || 0
      stockPagesize = stockPagesize || STOCK_PAGE_SIZE
      fetch(`${domain}/openapi/backtest/filterStrategy/stock.shtml?strategyId=${strategyId}&pageSize=${stockPagesize}&pageNum=${stockPage}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
         // console.log(result.data)
          commit('updateNowStock', result.data.content)
          /* commit('updatePage', { page: result.data.number, pageSize: result.data.size, totalPages: result.data.totalPages })*/
          commit('updateStockPage', { totalPages: result.data.totalPages })
        }
      })
    },
    queryTimeStrategy ({ commit }, { strategyId }) {
      fetch(`${domain}/openapi/backtest/timeStrategy/${strategyId}.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data)
          commit('updateTimeStrategy', result.data)
        }
      })
    },
    queryKline ({ commit }, { innerCode, strategyId }) {
      return fetch(`${domain}/openapi/backtest/timeStrategy/klineDay.shtml?strategyId=${strategyId}&innerCode=${innerCode}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data.kLine)
          commit('updateKline', result.data)
        }
      })
    },
    querySearch ({ commit }, { keyword }) {
      return fetch(`${domain}/openapi/search/stock.shtml?w=${keyword}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data.kLine)
          commit('updateSearch', result.data.list)
        }
      })
    }
  }
}

