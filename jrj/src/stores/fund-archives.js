/**
 * Created by admin on 2017/9/4.
 */
import 'whatwg-fetch'
export default {
  namespaced: true,
  state: {
    basicInfo: null,
    periodyieldInfo: null,
    allocationInfo: null,
    scaleAlterationInfo: null
  },
  mutations: {
    setBasicInfo (state, options) {
      const result = options.result
      if (result.errCode === 0) {
        state.basicInfo = result.data
      }
    },
    setPeriodyieldInfo (state, options) {
      const result = options.result
      if (result.errCode === 0) {
        state.periodyieldInfo = result.data
      }
    },
    setAllocationInfo (state, options) {
      const result = options.result
      if (result.errCode === 0) {
        state.allocationInfo = result.data
      }
    },
    setScaleAlterationInfo (state, options) {
      const result = options.result
      if (result.errCode === 0) {
        state.scaleAlterationInfo = result.data
      }
    }
  },
  actions: {
    getBasicInfo ({ commit }, { innerCode }) {
      const url = 'http://test.z3quant.com/openapi/fund/fundInfo/' + innerCode + '.shtml?orgCode=23545784'
      return fetch(url).then((res) => {
        return res.json()
      }).then((body) => {
        commit('setBasicInfo', {
          result: body
        })
      })
    },
    getPeriodyieldInfo ({ commit }, { innerCode, endDate }) {
      const url = 'http://test.z3quant.com/openapi/fund/fundperiodyield/' + innerCode + '.shtml?endDate=' + endDate
      return fetch(url).then((res) => {
        return res.json()
      }).then((body) => {
        commit('setPeriodyieldInfo', {
          result: body
        })
      })
    },
    getAllocationInfo ({ commit }, { innerCode, endDate, type }) {
      const url = `http://test.z3quant.com//openapi/fund/assetsAndIndustryDetail.shtml?innerCode=${innerCode}&endDate=${endDate}&type=${type}`
      return fetch(url).then((res) => {
        return res.json()
      }).then((body) => {
        commit('setAllocationInfo', {
          result: body
        })
      })
    },
    getScaleAlterationInfo ({ commit }, { innerCode }) {
      const url = `http://test.z3quant.com/openapi/fund/scaleAlteration.shtml?innerCode=${innerCode}`
      return fetch(url).then((res) => {
        return res.json()
      }).then((body) => {
        commit('setScaleAlterationInfo', {
          result: body
        })
      })
    }
  }
}
