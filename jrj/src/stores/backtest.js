// import 'whatwg-fetch'
import fetch from '../z3tougu/util/z3fetch'
import config, { domain } from '../z3tougu/config'

const state = {
    performance:{
        'total_income':config.emptyValue,//总收益
        'exceed_income':config.emptyValue,//超额收益
        'yearly_income':config.emptyValue,//年化收益
        'volatitity':config.emptyValue,//波动率
        'sharp_rate':config.emptyValue,//夏普比率
        'max_drawdown':config.emptyValue,//最大回撤
        'alpha':config.emptyValue,//阿尔法
        'beta':config.emptyValue//贝塔
    },
    historyData:{
        hs300:[],//沪深300收益
        portfolio:[],//组合收益
        position:[]
    }

}

const actions = {

}

const mutations = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
