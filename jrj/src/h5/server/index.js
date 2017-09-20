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

require('./routes')(router);

app.use(router.routes());

/* 读取编译后的相应的html模板文件 */
const templatePath = getTemplatePath();
const templateMap = {
  neicanmsapp: fs.readFileSync(path.join(templatePath, 'neicanmsapp.html')).toString()
}
app.use(async function(ctx, next) {
  let template = templateMap[ctx.template || 'default'];
  if (template) {
    ctx.type = 'text/html';
    ctx.body = template.replace(/<!--content-->/, ctx.body);
  }
  await next();
});

app.listen(PORT || 3000);