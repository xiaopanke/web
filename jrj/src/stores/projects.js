import Bem from 'bemcloud-storage'

Bem._config.APIServerURL = 'http://wxapi.bemcloud.com'

Bem.init({
  appId: '5ehEF9dud4ur8Eax3vukzs37gzRf6DPk',
  javascriptKey: 'BfWSudiRv6u3dMFHDjd4px2yTPmYgdPE'
})

// initial state
const state = {
  list: []
}

// getters
const getters = {

}

// actions
const actions = {
  fetch ({ commit }, params) {
    let query = new Bem.Query('Project')
    if (params.nickname) {
      const userQuery = new Bem.Query('_User')
      if (params.nickname === '未分配') {
        query.doesNotExist('user').find().then(projects => {
          projects = projects.map(prj => {
            const json = prj.toJSON()
            return json
          })
          commit('fetch', projects)
        })
      } else {
        userQuery.equalTo('nickname', params.nickname).find().then(users => {
          const user = users[0]
          if (!params.finish) {
            query = query.notEqualTo('finish', true)
          } else {
            query = query.equalTo('finish', true)
          }
          return query.equalTo('user', user).include('user').find()
        }).then(projects => {
          projects = projects.map(prj => {
            const json = prj.toJSON()
            json.user = prj.get('user').toJSON()
            return json
          })
          commit('fetch', projects)
        })
      }
    } else {
      if (!params.finish) {
        query = query.notEqualTo('finish', true)
      } else {
        query = query.equalTo('finish', true)
      }
      query.include('user').find().then(projects => {
        projects = projects.map(prj => {
          const json = prj.toJSON()
          if (prj.get('user')) {
            json.user = prj.get('user').toJSON()
          }
          return json
        })
        commit('fetch', projects)
      })
    }
  }
}

// mutations
const mutations = {
  fetch (state, projects) {
    state.list = projects
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
