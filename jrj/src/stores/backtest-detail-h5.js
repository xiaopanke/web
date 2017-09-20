// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import { domain } from '../z3tougu/config'

// initial state
export default {
  namespaced: true,
  state: {
    backtestResult: null,
    strategyResult: null,
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
    },
    stockIdData: null,
    strategyIdData: null
  },
  mutations: {
    setBacktestOptions (state, result) {
      state.strategyId = result
    },
    setBacktestData (state, result) {
      if (result.errCode === 0) {
        state.backtestResult = result.data
      } else {
        state.backtestResult = null
      }
    },
    setStrategyData (state, result) {
      if (result.errCode === 0) {
        state.strategyResult = result.data
      } else {
        state.strategyResult = null
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
    setStockIdData (state, result) {
      if (result.errCode === 0) {
        state.stockIdData = result.data
      } else {
        state.stockIdData = null
      }
    },
    setStrategyIdData (state, result) {
      if (result.errCode === 0) {
        state.strategyIdData = result.data
      } else {
        state.strategyIdData = null
      }
    }

  },
  actions: {
    getBacktestData ({ commit }, { backtestId }) {
      commit('setBacktestOptions', backtestId)
      return fetch(`${domain}/openapi/backtest/basicAndIndex.shtml?backtestId=${backtestId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setBacktestData', body)
      })
    },
    getStrategyData ({ commit }, { strategyId }) {
      // commit('setBacktestOptions', strategyId)
      return fetch(`${domain}/openapi/backtest/strategy/${strategyId}.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setStrategyData', body)
      })
    },
    getSyqxtData ({ commit }, { backtestId }) {
      // commit('setGoldOptions', backtestId)
      return fetch(`${domain}/openapi/backtest/returns.shtml?backtestId=${backtestId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setSyqxtData', body)
      })
    },
    getDrykData ({ commit }, { backtestId }) {
          // commit('setGoldOptions', backtestId)
      return fetch(`${domain}/openapi/backtest/profits.shtml?backtestId=${backtestId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setDrykData', body)
      })
    },
    getMrccData ({ commit }, { backtestId }) {
          // commit('setGoldOptions', backtestId)
      return fetch(`${domain}/openapi/backtest/positionRatios.shtml?backtestId=${backtestId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setMrccData', body)
      })
    },
    getSyytjData ({ commit }, { backtestId }) {
          // commit('setGoldOptions', backtestId)
      return fetch(`${domain}/openapi/backtest/profitMonths.shtml?backtestId=${backtestId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setSyytjData', body)
      })
    },
    getSylfbData ({ commit }, { backtestId }) {
          // commit('setGoldOptions', backtestId)
      return fetch(`${domain}/openapi/backtest/profitRates.shtml?backtestId=${backtestId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setSylfbData', body)
      })
    },
    getStockPoolIdData ({ commit }, { poolId }) {
      return fetch(`${domain}/openapi/filter/getStockPoolById.shtml?poolId=${poolId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setStockIdData', body)
      })
    },
    getStockStrategyIdData ({ commit }, { strategyId }) {
      return fetch(`${domain}/openapi/filter/getFilterStrategyById.shtml?strategyId=${strategyId}`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setStrategyIdData', body)
      })
    }

  }
}
