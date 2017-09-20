/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

// whatwg-fetch仅能在浏览器环境使用。
import 'whatwg-fetch'
import { domain } from '../z3tougu/config'

export default {
  namespaced: true,
  state: {
        // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更
    fundRecommendInfo: {// 基金推荐表
      symbol: '',
      name: '',
      fundTypeName: '',
      fundYieldYearSofar: '',
      riskLevelName: '',
      reasonList: [],
      xDate: [],
      fundReturn: [],
      huShenReturn: []
    },
    excellentSelectPlan: [], // 优选定投
    excellentSelectMoneyFund: [], // 优选货基
    revenueChampion: [],
    recommend: [],
    byRisk: [],
    hotTopicRecommend: [],
    portfolioList: []
   /* recommend: {
      portfolio_id: '',
      portfolio_name: '',
      risk_level: '',
      risk_level_name: '',
      income_index: '',
      income_index_name: '',
      income_index_value: '',
      min_purchase_amount: '',
      recommend_info: [],
      kline: { run_date: '', date: [], hs300: [], portfolio: [] }
    }*/
  },
  mutations: {
    updateFundRecommendInfo (state, recommendInfo) {
      // console.log(filterdetail)
      state.fundRecommendInfo = recommendInfo
    },
    updateExcellentSelectPlan (state, selectPlan) {
      state.excellentSelectPlan = selectPlan
    },
    updateSelectMoneyFund (state, moneyFund) {
      state.excellentSelectMoneyFund = moneyFund
    },
    updateRevenueChampion (state, champion) {
      state.revenueChampion = champion
    },
    updateRecommend (state, recommend) {
      state.recommend = recommend
    },
    updateRecommendByRisk (state, risk) {
      state.byRisk = risk
    },
    updatehotTopicRecommend (state, hotRecom) {
      state.hotTopicRecommend = hotRecom
    },
    updatePortfolioList (state, portfolioList) {
      state.portfolioList = portfolioList
    }
  },
    // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    queryfundRecommendInfo ({ commit }) {
      return fetch(`${domain}/openapi/fund/fundRecommendInfo.shtml?orgCode=200180365`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data)
          // console.log(result.data.evaluationIndexs.winRatio)
          commit('updateFundRecommendInfo', result.data)
        }
      })
    },
    queryExcellentSelectPlan ({ commit }) {
      return fetch(`${domain}/openapi/fund/excellentSelectPlan.shtml?orgCode=200180365`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          console.log(result.data[0].name)
          // console.log(result.data.evaluationIndexs.winRatio)
          commit('updateExcellentSelectPlan', result.data)
        }
      })
    },
    queryhotTopicRecommend ({ commit }) {
      return fetch(`${domain}/openapi/fund/hotTopicRecommend.shtml?orgCode=200180365`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          console.log(result.data[0].name)
          // console.log(result.data.evaluationIndexs.winRatio)
          commit('updatehotTopicRecommend', result.data)
        }
      })
    },
    querySelectMoneyFund ({ commit }) {
      return fetch(`${domain}/openapi/fund/excellentSelectMoneyFund.shtml?orgCode=200180365`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          console.log(result.data[0].name)
          // console.log(result.data.evaluationIndexs.winRatio)
          commit('updateSelectMoneyFund', result.data)
        }
      })
    },
    queryRevenueChampion ({ commit }) {
      return fetch(`${domain}/openapi/fund/revenueChampion.shtml?orgCode=200180365`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          console.log(result.data[0].name)
          // console.log(result.data.evaluationIndexs.winRatio)
          commit('updateRevenueChampion', result.data)
        }
      })
    }, /* http://www.z3quant.com/openapi/fintechportfolio/getRecommendByRisk.shtml?risk=1&page=1&page_num=8*/
    queryRecommend ({ commit }) {
      return fetch(`${domain}/openapi/fintechportfolio/recommend.shtml`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          console.log(result.data[0].kline)
          // console.log(result.data.evaluationIndexs.winRatio)
          commit('updateRecommend', result.data)
        }
      })
    },
    queryRecommendByRisk ({ commit }, { risk }) {
      return fetch(`${domain}/openapi/fintechportfolio/getRecommendByRisk.shtml??orgCode=254520720&risk=${risk}&page=1&page_num=8`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data.evaluationIndexs.winRatio)
          commit('updateRecommendByRisk', result.data)
        }
      })
    },
    queryPortfolioList ({ commit }) {
      return fetch(`${domain}/openapi/fintechportfolio/59b0b78d0cf5bf4b20c4e3ee.shtml?page=1&page_num=20`, {
        mode: 'cors'
      }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          // console.log(result.data.evaluationIndexs.winRatio)
          console.log(result.data)
          commit('updatePortfolioList', result.data)
        }
      })
    }

  }
}

