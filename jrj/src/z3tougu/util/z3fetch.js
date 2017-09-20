import 'whatwg-fetch'
import store from '../store'
const originFetch = fetch
export default function (url, options) {
  const authInfo = store.state.auth
  if (!authInfo.authorization) {
    return originFetch(url, options)
  }
  const expires = authInfo.expires
  const updateTime = authInfo.updateTime
  const now = new Date().getTime()

  if (expires !== -1 && now - updateTime < expires * 1000) {
    options = insertAuthHeader(options)
    return originFetch(url, options)
  }
  return store.dispatch('authSetting').then(() => {
    options = insertAuthHeader(options)
    return originFetch(url, options)
  })
}

function insertAuthHeader (options) {
  const authHeader = store.getters.authHeader
  let headers = {}
  if (!options) {
    options = { headers: {}}
  }
  if (options && options.headers) {
    headers = { ...options.headers }
  }
  headers = { ...headers, ...authHeader }
  options.headers = headers
  return options
}
