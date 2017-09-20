
import z3websocket from '../z3tougu/z3socket'

const mutationTypes = {
  'UPDATE_CONNECTION_STATUS': 'UPDATE_CONNECTION_STATUS',
  'UPDATE_MESSAGE': 'UPDATE_MESSAGE'
}
const state = {
  readystate: 0,
  message: ''
}

const actions = {
  init ({ state, commit }) {
    z3websocket.initWebsocket().then((ws) => {
      commit(mutationTypes.UPDATE_CONNECTION_STATUS, ws.readyState)
      console.info('[websocket:open]')
      ws.onmessage = (event) => {
        commit(mutationTypes.UPDATE_MESSAGE, event.data)
      }
      ws.onclose = () => {
        commit(mutationTypes.UPDATE_CONNECTION_STATUS, ws.readyState)
        console.info('[websocket:closed]')
      }
      ws.onerror = () => {
        console.info('[websocket:error]')
      }
    }).catch((e) => {
      console.log(e)
    })
  },
  send ({ state, commit }, msg) {
    console.info('[websocket:send message]' + JSON.stringify(msg))
    z3websocket.ws.send(JSON.stringify(msg))
  }
}

const mutations = {
  [mutationTypes.UPDATE_MESSAGE] (state, msg) {
    state.message = JSON.parse(msg)
  },
  [mutationTypes.UPDATE_CONNECTION_STATUS] (state, status) {
    state.readystate = status
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
