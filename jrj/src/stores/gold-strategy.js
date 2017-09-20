// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import { domain } from '../z3tougu/config'

// initial state
export default {
  namespaced: true,
  state: {
    goldResult: null,
    strategyId: '',
    syqxtData: {
      xData: [],
      data1: [],
      data2: []
    },
    drykData: {
      xData: [],
      data1: [],
      data2: []
    },
    mrccData: {
      xData: [],
      data1: []
    },
    syytjData: {
      xData: [],
      data1: [],
      data2: []
    },
    sylfbData: {
      xData: [],
      data1: [],
      data2: []
    },
    mrjyData: null,
    dqxgData: null,
    radarData: {
      legend: [],
      data: []
    }
  },
  mutations: {
    setGoldOptions (state, result) {
      state.strategyId = result
    },
    setGoldData (state, result) {
      if (result.errCode === 0) {
        state.goldResult = result.data
      } else {
        state.goldResult = null
      }
    },
    setSyqxtData (state, result) {
      if (result.errCode === 0) {
        state.syqxtData.xData = []
        state.syqxtData.data1 = []
        state.syqxtData.data2 = []
        const data = result.data
        for (var i = 0; i < data.length; i++) {
          state.syqxtData.xData.push(data[i].backtestDate)
          state.syqxtData.data1.push(Number(data[i].totalReturn).toFixed(2))
          state.syqxtData.data2.push(Number(data[i].benchmarkPeriodReturn).toFixed(2))
        }
      } else {
        state.syqxtData.xData = []
        state.syqxtData.data1 = []
        state.syqxtData.data2 = []
      }
    },
    setDrykData (state, result) {
      if (result.errCode === 0) {
        state.drykData.xData = []
        state.drykData.data1 = []
        state.drykData.data2 = []
        const data = result.data
        for (var i = 0; i < data.length; i++) {
          state.drykData.xData.push(data[i].backtestDate)
          if (data[i].profit > 0) {
            state.drykData.data1.push(Number(data[i].profit).toFixed(2))
            state.drykData.data2.push(0)
          } else if (data[i].profit < 0) {
            state.drykData.data1.push(0)
            state.drykData.data2.push(Number(data[i].profit).toFixed(2))
          } else {
            state.drykData.data1.push(0)
            state.drykData.data2.push(0)
          }
        }
      } else {
        state.drykData.xData = []
        state.drykData.data1 = []
        state.drykData.data2 = []
      }
    },
    setMrccData (state, result) {
      if (result.errCode === 0) {
        state.mrccData.xData = []
        state.mrccData.data1 = []
        const data = result.data
        for (var i = 0; i < data.length; i++) {
          state.mrccData.xData.push(data[i].backtestDate)
          state.mrccData.data1.push(Number(data[i].positionRatio).toFixed(2))
        }
      } else {
        state.mrccData.xData = []
        state.mrccData.data1 = []
      }
    },
    setSyytjData (state, result) {
      if (result.errCode === 0) {
        state.syytjData.xData = []
        state.syytjData.data1 = []
        state.syytjData.data2 = []
        const data = result.data
        state.syytjData.xData = data.backtestDate
        state.syytjData.data1 = data.backtestData
        state.syytjData.data2 = data.benchmarkData
      } else {
        state.syytjData.xData = []
        state.syytjData.data1 = []
        state.syytjData.data2 = []
      }
    },
    setSylfbData (state, result) {
      if (result.errCode === 0) {
        state.sylfbData.xData = []
        state.sylfbData.data1 = []
        state.sylfbData.data2 = []
        const data = result.data
        for (var i = 0; i < data.rates.length; i++) {
          state.sylfbData.xData.push(Number(data.rates[i]).toFixed(2) + '%')
          if (data.rates[i] < 0) {
            state.sylfbData.data1.push(data.counts[i])
            state.sylfbData.data2.push(0)
          } else {
            state.sylfbData.data1.push(0)
            state.sylfbData.data2.push(data.counts[i])
          }
        }
      } else {
        state.sylfbData.xData = []
        state.sylfbData.data1 = []
        state.sylfbData.data2 = []
      }
    },
    setMrjyData (state, result) {
      if (result.errCode === 0) {
        state.mrjyData = null
        state.mrjyData = result.data
      } else {
        state.mrjyData = null
      }
    },
    setDqxgData (state, result) {
      if (result.errCode === 0) {
        state.dqxgData = null
        state.dqxgData = result.data
      } else {
        state.dqxgData = null
      }
    },
    setRadarData (state, result) {
      if (result.errCode === 0) {
        const radarData = result.data
        const colorArr = ['#F6B03D', '#4591FC', '#73BF1C']
        for (var i = 0; i < radarData.length; i++) {
          state.radarData.legend.push(radarData[i].tradeDate)
          state.radarData.data.push(
            {
              value: [radarData[i].growth, radarData[i].leverage, radarData[i].liquidity, radarData[i].momentum, radarData[i].size, radarData[i].value, radarData[i].volatility, radarData[i].quality, radarData[i].analystExpect, radarData[i].shareHolder], name: radarData[i].tradeDate, itemStyle: { normal: { color: colorArr[i] }}
            })
        }
      } else {
        state.radarData = null
      }
    }
  },
  actions: {
    getGoldStrategyData ({ commit }, { strategyId }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/goldStrategy/basicAndIndex.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setGoldData', body)
      })
    },
    getSyqxtData ({ commit }, { strategyId }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/goldStrategy/returns.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setSyqxtData', body)
      })
    },
    getDrykData ({ commit }, { strategyId }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/goldStrategy/profits.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setDrykData', body)
      })
    },
    getMrccData ({ commit }, { strategyId }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/goldStrategy/positionRatios.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setMrccData', body)
      })
    },
    getSyytjData ({ commit }, { strategyId }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/goldStrategy/monthProfit.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setSyytjData', body)
      })
    },
    getSylfbData ({ commit }, { strategyId }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/goldStrategy/sellProfit.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setSylfbData', body)
      })
    },
    getMrjyData ({ commit }, { strategyId, page }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/goldStrategy/tradeDetail.shtml?strategyId=${strategyId}&size=10&page=${page || 0}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setMrjyData', body)
      })
    },
    getDqxgData ({ commit }, { strategyId, pageNum }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/goldStrategy/stock.shtml?strategyId=${strategyId}&pageSize=10&pageNum=${pageNum || 0}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setDqxgData', body)
      })
    },
    getRadarData ({ commit }, { strategyId }) {
      commit('setGoldOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/strategy/risk.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setRadarData', body)
      })
    }
  }
}
