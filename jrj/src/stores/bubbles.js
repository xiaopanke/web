// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import { domain } from '../z3tougu/config'

// initial state
export default {
  namespaced: true,
  state: {
    bubblesData: {
      xData: [],
      yData: [],
      bubbleSize: [],
      bubbleColor: [],
      innerCode: [],
      name: [],
      seriesData: []
    },
    parameterData: {
      xData: '',
      yData: '',
      bubblesSize: '',
      bubbleColor: '',
      indexScope: '',
      industryScope: '',
      topicScope: '',
      marketValue: '',
      historyVolume: '',
      innerCode: ''
    },
    userId: '',
    stockPool: null,
    userStrategy: null
  },
  mutations: {
    setBubblesOptions (state, options) {
      state.parameterData.xData = options.xDefault
      state.parameterData.yData = options.yDefault
      state.parameterData.bubblesSize = options.sizeDefault
      state.parameterData.bubbleColor = options.colorDefault
      state.parameterData.indexScope = options.indexRangeDefault
      state.parameterData.industryScope = options.industryRangeDefault
      state.parameterData.topicScope = options.topicScope
      state.parameterData.marketValue = options.marketValueDefault
      state.parameterData.historyVolume = options.historyValueRangeDefault
      state.parameterData.innerCode = options.innerCode
    },
    setBubblesData (state, result) {
      const data = result.data
      state.bubblesData = {
        xData: [],
        yData: [],
        bubbleSize: [],
        bubbleColor: [],
        innerCode: [],
        name: [],
        seriesData: []
      }
      if (result.errCode === 0) {
        for (var item of data) {
          state.bubblesData.xData.push(item.xData)
          state.bubblesData.yData.push(item.yData)
          state.bubblesData.bubbleSize.push(item.bubbleSize)
          state.bubblesData.bubbleColor.push(item.bubbleColor)
          state.bubblesData.innerCode.push(item.innerCode)
          state.bubblesData.name.push(item.name)
          if (state.parameterData.xData === 'chi_spel' && state.parameterData.yData === 'chi_spel') {
            state.bubblesData.seriesData.push([item.xData.replace('*', '').substr(0, 1), item.yData.replace('*', '').substr(0, 1)])
          } else {
            if (state.parameterData.xData === 'chi_spel') {
              if (item.xData) state.bubblesData.seriesData.push([item.xData.replace('*', '').substr(0, 1), item.yData])
            } else if (state.parameterData.yData === 'chi_spel') {
              if (item.yData) state.bubblesData.seriesData.push([item.xData, item.yData.replace('*', '').substr(0, 1)])
            }
            state.bubblesData.seriesData.push([item.xData, item.yData])
          }
        }
      } else {
        state.bubblesData = {
          xData: [],
          yData: [],
          bubbleSize: [],
          bubbleColor: [],
          innerCode: [],
          name: [],
          seriesData: []
        }
      }
    },
    setStockOptions (state, result) {
      state.userId = result
    },
    setStockPool (state, result) {
      if (result.errCode === 0) {
        result.data.unshift({ poolId: '', poolName: '全部' })
        state.stockPool = result.data
      }
    },
    setStrategyOptions (state, result) {
      state.userId = result
    },
    setStrategy (state, result) {
      if (result.errCode === 0) {
        result.data.unshift({ id: '', strategyName: '全部' })
        state.userStrategy = result.data
      }
    }
  },
  actions: {
    getBubblesData ({ commit }, { options }) {
      // alert(`xData=${options.xDefault}&yData=${options.yDefault}&bubbleSize=${options.sizeDefault}&bubbleColor=${options.colorDefault}&indexScope=${options.indexRangeDefault}&industryScope=${options.industryRangeDefault}&topic=${options.topic}&marketValue=${options.marketValueDefault}&historyVolume=${options.historyValueRangeDefault}&innerCode=${options.innerCode}&strategy=${options.strategyDefault}&pools=${options.stockPoolDefault}`)
      commit('setBubblesOptions', options)
      return fetch(`${domain}/openapi/findBubbles`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: `xData=${options.xDefault}&yData=${options.yDefault}&bubbleSize=${options.sizeDefault}&bubbleColor=${options.colorDefault}&indexScope=${options.indexRangeDefault}&industryScope=${options.industryRangeDefault}&topic=${options.topic}&marketValue=${options.marketValueDefault}&historyVolume=${options.historyValueRangeDefault}&innerCode=${options.innerCode}&strategy=${options.strategyDefault}&pools=${options.stockPoolDefault}`
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setBubblesData', body)
      })
    },
    getStrategy ({ commit, state, rootState }) {
      const userId = rootState.user.userId
      if (!userId) {
        commit('setStrategy', [])
        return
      }
      return fetch(`${domain}/openapi/filter/member/userStrategy.shtml?userId=${userId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setStrategy', body)
      })
    },
    getStockPool ({ commit, state, rootState }) {
      const userId = rootState.user.userId
      if (!userId) {
        commit('setStockPool', [])
        return
      }
      return fetch(`${domain}/openapi/filter/stock/listEquityPool.shtml?userId=${userId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setStockPool', body)
      })
    }

  }
}
