import 'whatwg-fetch'
import { domain } from '../z3tougu/config'

// initial state
export default {
  namespaced: true,
  state: {
    fundType: null,
    ljjzData: null,
    fundBuyData: null,
    fundBubbleData: {
      xData: [],
      data: [],
      sharpeRatio: [],
      name: []
    },
    fundFeatureData: null,
    exchrHldData: null,
    investStyleData: null
  },
  mutations: {
    setFundOptions (state, result) {
      state.fundType = result
    },
    setLjjzData (state, result) {
      if (result.errCode === 0) {
        state.ljjzData = result.data
      } else {
        state.ljjzData = null
      }
    },
    setFundBuyData (state, result) {
      if (result.errCode === 0) {
        state.fundBuyData = result.data
      } else {
        state.fundBuyData = null
      }
    },
    setBubbleData (state, result) {
      if (result.errCode === 0) {
        const data = result.data
        state.fundBubbleData.xData = []
        state.fundBubbleData.data = []
        state.fundBubbleData.sharpeRatio = []
        state.fundBubbleData.name = []
        for (var i = 0; i < data.length; i++) {
          state.fundBubbleData.xData.push(Number(data[i].statVolat).toFixed(2))
          state.fundBubbleData.data.push(Number(data[i].fundYieldYear).toFixed(2))
          state.fundBubbleData.sharpeRatio.push(Number(data[i].sharpeRatioYear).toFixed(2))
          state.fundBubbleData.name.push(data[i].name)
        }
      } else {
        state.fundBubbleData.xData = []
        state.fundBubbleData.data = []
        state.fundBubbleData.sharpeRatio = []
        state.fundBubbleData.name = []
      }
    },
    setFeatureData (state, result) {
      if (result.errCode === 0) {
        state.fundFeatureData = result.data
      } else {
        state.fundFeatureData = null
      }
    },
    setExchrHldData (state, result) {
      if (result.errCode === 0) {
        state.exchrHldData = result.data
      } else {
        state.exchrHldData = null
      }
    },
    setInvestStyleData (state, result) {
      if (result.errCode === 0) {
        state.investStyleData = result.data[0]
      } else {
        state.investStyleData = null
      }
    }
  },
  actions: {
    getFundLjjzData ({ commit }, { innerCode }) {
      // commit('setFundOptions', innerCode)
      return fetch(`${domain}/openapi/fund/fundVal/000001.CW.shtml/?fundType=4`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setLjjzData', body)
      })
    },
    getFundBuyData ({ commit }, { innerCode }) {
      // commit('setFundOptions', innerCode)
      return fetch(`${domain}/openapi/fund/fundbuy/${innerCode}.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setFundBuyData', body)
      })
    },
    getBubbleData ({ commit }, { innerCode }) {
          // commit('setFundOptions', innerCode)
      return fetch(`${domain}/openapi/fund/riskAndProceedsMap.shtml?innerCode=000001.CW`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setBubbleData', body)
      })
    },
    getFeatureData ({ commit }, { innerCode }) {
          // commit('setFundOptions', innerCode)
      return fetch(`${domain}/openapi/fund/fundCharacteristics.shtml?innerCode=000001.CW`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setFeatureData', body)
      })
    },
    getExchrHldData ({ commit }, { innerCode }) {
          // commit('setFundOptions', innerCode)
      return fetch(`${domain}/openapi/fund/assetExchrHld/${innerCode}.shtml?limit=5`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setExchrHldData', body)
      })
    },
    getInvestStyleData ({ commit }, { innerCode }) {
          // commit('setFundOptions', innerCode)
      return fetch(`${domain}/openapi/fund/investStyle?innerCode=000001.CW&date=2017-06-01`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(body => {
        commit('setInvestStyleData', body)
      })
    }

  }
}
