import fetch from '../z3tougu/util/z3fetch'
import { domain } from '../z3tougu/config'

// initial state
const state = {
  industries: null,
  stockData: null,
  stockChartData: null,
  calendarsData: null
}

// getters
const getters = {

}

const mutationsTypes = {
  QUERY_RANGE_BY_CODE: 'QUERY_RANGE_BY_CODE',
  UPDATE_DATA: 'UPDATE_DATA',
  STOCK_CHART_DATA: 'STOCK_CHART_DATA',
  CALENDARS_DATA: 'CALENDARS_DATA',
  ERROR: 'ERROR'
}
    // actions
const actions = {
  queryRangeByCode ({ commit, state }, { code }) {
    let url
    if (code === '') {
      url = domain + '/openapi/openjson/tx/' + code + '.json'
    } else {
      url = domain + '/openapi/openjson/tx/auth/' + code + '.json'
    }
    /* code = 'all'
    const url = 'mock/' + code + '.json'*/
    return fetch(url).then((res) => {
      console.log(res.headers.get('Content-Type'))
      return res.json()
    }).then((data) => {
      commit(mutationsTypes.QUERY_RANGE_BY_CODE, data.children)
    }).catch(() => { commit(mutationsTypes.ERROR) })
  },
  updateData ({ commit, state }, { isContinue, condition, code }) {
    const url = `${domain}/openapi/timedQueryMap?isContinue=${isContinue}&condition=${condition}&code=${code}`
    return fetch(url).then((res) => {
      return res.json()
    }).then((data) => {
      commit(mutationsTypes.UPDATE_DATA, data.data)
    }).catch(() => { commit(mutationsTypes.ERROR) })
  },
  updateDataByDate ({ commit, state }, { date, code }) {
    const url = domain + '/openapi/openjson/tx/' + date + '.json'
    return fetch(url).then((res) => {
      return res.json()
    }).then((data) => {
      commit(mutationsTypes.UPDATE_DATA, data)
    }).catch(() => { commit(mutationsTypes.ERROR) })
  },
  stockChartData ({ commit, state }, { stockId, code }) {
    const url = domain + '/openapi/industries/' + stockId + '.json?indexCode=' + code
    return fetch(url).then((res) => {
      return res.json()
    }).then((data) => {
      commit(mutationsTypes.STOCK_CHART_DATA, data.data)
    }).catch(() => { commit(mutationsTypes.ERROR) })
  },
  queryCalendarsData ({ commit, state }) {
    const url = `${domain}/openapi/calendars`
    return fetch(url).then((res) => {
      return res.json()
    }).then((data) => {
      commit(mutationsTypes.CALENDARS_DATA, data.data.reverse())
    }).catch(() => { commit(mutationsTypes.ERROR) })
  }
}
// mutations
const mutations = {
  [mutationsTypes.QUERY_RANGE_BY_CODE] (state, industries) {
    state.industries = industries
  },
  [mutationsTypes.UPDATE_DATA] (state, stockData) {
    state.stockData = stockData
  },
  [mutationsTypes.STOCK_CHART_DATA] (state, stockChartData) {
    state.stockChartData = stockChartData
  },
  [mutationsTypes.CALENDARS_DATA] (state, calendarsData) {
    state.calendarsData = calendarsData
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
