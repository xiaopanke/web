/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

export default {
  namespaced: true,
  state: {
    content: 'sync store'
  }
}
