/*
 * 服务端渲染的入口文件
 */

import Koa from 'koa'
import Router from 'koa-router'
import fs from 'fs'
import path from 'path'
import getTemplatePath from 'utils/getTemplatePath'

const app = new Koa();

const router = new Router();

/*
 * 读取routes路径下的全部路由文件进行路由注册
 */
require('./routes')(router);

app.use(router.routes());

/* 读取编译后的相应的html模板文件 */
const templatePath = getTemplatePath();
const templateMap = {
  default: fs.readFileSync(path.join(templatePath, 'index.html')).toString()
}
app.use(async function(ctx, next) {
  ctx.type = 'text/html';
  ctx.body = templateMap[ctx.template || 'default'].replace(/<!--content-->/, ctx.body);
  await next();
});

app.listen(PORT || 3000);