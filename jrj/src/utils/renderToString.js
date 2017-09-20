/*
 * 服务端的把vue渲染为html的方法
 */

import * as vsr from 'vue-server-renderer'
import pify from 'pify'

const renderer = vsr.createRenderer()

/*
 * 返回基于promise的renderToString方法
 */
module.exports = pify(renderer.renderToString.bind(renderer))
