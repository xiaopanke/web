/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

// whatwg-fetch仅能在浏览器环境使用。
// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import config, { domain } from '../z3tougu/config'

export const mutationTypes = {
  UPDATE_HOTLIST: 'UPDATE_HOTLIST',
  UPDATE_TOPIC_SUMMARY: 'UPDATE_TOPIC_SUMMARY',
  UPDATE_TOPIC_LINEDATA: 'UPDATE_TOPIC_LINEDATA',
  UPDATE_TOPIC_NEWS: 'UPDATE_TOPIC_NEWS',
  UPDATE_TOPIC_STOCKLIST: 'UPDATE_TOPIC_STOCKLIST',
  UPDATE_TOPIC_RELSTOCK: 'UPDATE_TOPIC_RELSTOCK'
}
const PAGE_SIZE = 10
const INFOR_PAGESIZE = 10
export default {
  namespaced: true,
  state: {
        // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更
    topic: null,
    hotlist: [], // 热点主题
    themeList: [], // 全部主题
    informatList: [], // 资讯
    stockList: [], // 成分股
    themeSummary: { topicNum: 0, topicUpNum: 0, topicDownNum: 0 }, // 上涨下跌
    sortby: 'hot', // hot | time,
    desc: true,   // 降序
    pagesize: PAGE_SIZE,
    page: 1,
    total: 0,
    detail: { eventNum: 0, equityNum: 0, declareDate: 0, topicMarket: {}},
    allCharts: [],
    allLimit: [],
    realtimeLimit: [],
    listChange: [],
    realtimeCharts: [],
    relatedStocks: {},
    groupTopics: [],
    inforPage: 0,
    inforPageSize: INFOR_PAGESIZE,
    inforTotal: 0
   /* topicReturnRate: [],
    hs300ReturnRate: [],
    tradeDate: []*/ // 全部charts
  },
  mutations: {
    [mutationTypes.UPDATE_HOTLIST] (state, hotList) {
      state.hotlist = hotList
    },
    updateSummary (state, summary) {
      state.themeSummary = summary
    },
    updateAllTopic (state, themeList) {
      state.themeList = themeList
      const stocks = {}
      for (const topic of themeList) {
        const relatedEquity = topic.relatedEquity
        for (const stock of relatedEquity) {
          stocks[stock.innerCode] = stock
        }
      }
      state.relatedStocks = stocks
    },
    updatePage (state, options) {
      console.log(options.totalPages)
      state.pagesize = options.pageSize || PAGE_SIZE
      state.page = options.page || 1
      state.total = options.totalPages
    },
    updateInforPage (state, options) {
      console.log(options)
      state.inforPageSize = options.inforPageSize || INFOR_PAGESIZE
      state.inforPage = options.inforPage || 1
      state.inforTotal = options.inforTotal
    },
    updateInformat (state, infor) {
      state.informatList = infor
    },
    updateStockList (state, stockList) {
      state.stockList = stockList
      const stocks = {}
      for (const stock of stockList) {
        stocks[stock.innerCode] = stock
      }
      state.relatedStocks = stocks
    },
    updateDetailHead (state, detailHead) {
      state.detail = detailHead
    },
    updateAllCharts (state, allCharts) {
      state.allCharts = allCharts

     /* state.allCharts && state.allCharts.forEach(item => {
        state.topicReturnRate.push(item.topicReturnRate)
        state.hs300ReturnRate.push(item.hs300ReturnRate)
        state.tradeDate.push(item.tradeDate)
      })*/
    },
    upAllChartsLimit (state, allLimit) {
      state.allLimit = allLimit
    },
    updateRealtimeChartsLimit (state, realtimeLimit) {
      state.realtimeLimit = realtimeLimit
    },
    updateListChange (state, listChange) {
      state.listChange = listChange
    },
    updateRealtimeCharts (state, realtime) {
      state.realtimeCharts = realtime
    },
    updateGroupTopics (state, group) {
      state.groupTopics = group
    },
    [mutationTypes.UPDATE_TOPIC_SUMMARY] (state, detail) {
      /* state.topic || (state.topic = {})
      state.topic = topic*/
      state.detail = detail
    },
    [mutationTypes.UPDATE_TOPIC_LINEDATA] (state, lineData) {
      state.topic || (state.topic = {})
      state.topic.lineDate = lineData
    },
    [mutationTypes.UPDATE_TOPIC_NEWS] (state, news) {
      state.topic || (state.topic = {})
      state.topic.news = news// 资讯
    },
    [mutationTypes.UPDATE_TOPIC_STOCKLIST] (state, news) {
      state.topic || (state.topic = {})
      state.topic.news = news
    },
    [mutationTypes.UPDATE_TOPIC_RELSTOCK] (state, stock) {
      const stocks = state.relatedStocks
      stocks[stock.innerCode].price = stock.price !== null ? parseFloat(stock.price).toFixed(2) : config.emptyValue
      stocks[stock.innerCode].chg = stock.chg !== null ? parseFloat(stock.chg).toFixed(2) : config.emptyValue
      stocks[stock.innerCode].curChngPct = stock.curChngPct !== null ? parseFloat(stock.curChngPct).toFixed(2) : config.emptyValue
      // state.topic.relatedStocks = { ...stocks, stock }
    }
  },
    // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    queryHot ({ commit }) {
      return fetch(`${domain}/openapi/topic/hotTopic.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          commit(mutationTypes.UPDATE_HOTLIST, result.data)
        }
      })
    },
    querySummary ({ commit }) {
      fetch(`${domain}/openapi/topic/topicStat.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          commit('updateSummary', result.data)
        }
      })
    },
    queryAllTopic ({ commit }, { sortField, page, pagesize, totalPages }) {
      page = page || 0
      pagesize = pagesize || PAGE_SIZE
      return fetch(`${domain}/openapi/topic/pageTopic.shtml?sort=${sortField},desc&page=${page}&size=${pagesize}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        // console.log(result)
        // console.log(result.data.content[0].relatedEquity)
        if (result.errCode === 0) {
          commit('updateAllTopic', result.data.content)
          // commit('updatePage', result.data)
          commit('updatePage', { page: result.data.number, pageSize: result.data.size, totalPages: result.data.totalPages })
          // console.log(result.data.size)
        }
      })
    },
    queryListChange ({ commit }, { sortField, page, pagesize, totalPages }) {
      page = page || 0
      pagesize = pagesize || PAGE_SIZE
      return fetch(`${domain}/openapi/topic/pageTopic.shtml?sort=${sortField},desc&page=${page}&size=${pagesize}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        // console.log(result)
        // console.log(result.data.content[0].relatedEquity)
        if (result.errCode === 0) {
          commit('updateListChange', result.data.content)
          // commit('updatePage', result.data)
          commit('updatePage', { page: result.data.number, pageSize: result.data.size, totalPages: result.data.totalPages })
          // console.log(result.data.size)
        }
      })
    },
    queryInformatList ({ commit }, { topicCode, inforPage, inforPageSize }) {
      inforPage = inforPage || 0
      inforPageSize = inforPageSize || INFOR_PAGESIZE
      // fetch('http://www.z3quant.com/openapi/news/topic/topicCode.shtml?page=1&size=10', {
      fetch(`${domain}/openapi/news/topic/${topicCode}.shtml?page=${inforPage}&size=${inforPageSize}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data.content[0].topicName)
          commit('updateInformat', result.data.content)
          commit('updateInforPage', { inforPage: result.data.number, inforPageSize: result.data.size, inforTotal: result.data.totalPages })
        }
      })
    },
    // queryTopicSummary ({ commit }, { topicId }) {
 /*   queryTopicSummary ({ commit }) {
      const url = 'http://www.z3quant.com/openapi/topic/400130195.sthml'
      // const url = `http://www.z3quant.com/openapi/topic/${topicId}.sthml`
      fetch(url, { mode: 'cors' }).then(res => res.json).then(result => {
        if (result.errCode === 0) {
          // console.log(result)
          commit(mutationTypes.UPDATE_TOPIC_SUMMARY)
        }
      })
    },*/
    queryTopicLineData ({ commit }, { topicId, period }) {
      const url = `${domain}/openapi/topic/${topicId}.sthml?period=${period}`
      fetch(url, { mode: 'cors' }).then(res => res.json).then(result => {
        commit(mutationTypes.UPDATE_TOPIC_LINEDATA)
      })
    },
    queryStockList ({ commit }, { topicCode, size }) {
      fetch(`${domain}/openapi/topic/${topicCode}/stock.shtml?sort=file,desc&page=0&size=${size}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        // console.log(result.data.content[0])
        if (result.errCode === 0) {
          commit('updateStockList', result.data.content)
        }
      })
    },
    queryDetailHead ({ commit }, { topicCode }) {
      fetch(`${domain}/openapi/topic/${topicCode}.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        // console.log(result)
        if (result.errCode === 0) {
          commit('updateDetailHead', result.data)
        }
      })
    },
    queryAllCharts ({ commit }, { period, topicCode }) {
      return fetch(`${domain}/openapi/topic/history/${topicCode}.shtml?period=${period}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        // console.log(result)
        if (result.errCode === 0) {
          commit('updateAllCharts', result.data.reverse())
        }
      })
    },
    queryAllChartsLimit ({ commit }, { period, topicCode }) {
      return fetch(`${domain}/openapi/topic/history/${topicCode}.shtml?period=${period}&limit=1`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        // console.log(result)
        if (result.errCode === 0) {
          commit('upAllChartsLimit', result.data)
        }
      })
    },
    queryRealtimeCharts ({ commit }, { period, topicCode }) {
      return fetch(`${domain}/openapi/topic/realtime/${topicCode}.shtml?period=${period}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        console.log(result)
        if (result.errCode === 0) {
          // console.log(result.data.tradeMin)
          commit('updateRealtimeCharts', result.data.reverse())
        }
      })
    }, /* http://test.z3quant.com/openapi/topic/realtime/400130025.shtml?limit=1*/
    queryRealtimeChartsLimit ({ commit }, { period, topicCode }) {
      return fetch(`${domain}/openapi/topic/realtime/${topicCode}.shtml?period=${period}&limit=1`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        console.log(result)
        if (result.errCode === 0) {
          // console.log(result.data.tradeMin)
          commit('updateRealtimeChartsLimit', result.data)
        }
      })
    },
    queryGroupTopics ({ commit }) {
      fetch(`${domain}/openapi/topic/groupTopics.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data)
          commit('updateGroupTopics', result.data)
        }
      })
    },
    queryTopicLineDataRealtime ({ commit }) {

    }
  }
}
