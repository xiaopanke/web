import SockJS from 'sockjs-client'
export default{
  ws: null,
  initWebsocket () {
    return new Promise((resolve, reject) => {
      // 测试环境websocket关闭，暂时用正式环境websocket测试
      // const wsUrl = '//10.77.4.83:8082/websocket/webSocketServer/sockjs'
      const wsUrl = '//www.z3quant.com/websocket/webSocketServer/sockjs'
      if (this.ws) {
        this.ws.close()
        this.ws = null
      }
      this.ws = new SockJS(wsUrl)
      this.ws.onopen = () => {
        resolve(this.ws)
      }
    })
  }
}
