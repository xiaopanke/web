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
let routesDir = path.join(__dirname, 'routes');
let routeFiles = fs.readdirSync(routesDir);
routeFiles.forEach(file => {
  // 防止有一些隐藏文件对路由注册造成干扰
  let ext = path.extname(file);
  if (ext === '.js') {
    require('./routes/' + file)(router);
  }
});

app.use(router.routes());

/* 读取编译后的相应的html模板文件 */
const templatePath = getTemplatePath();
const templateMap = {}
app.use(async function(ctx, next) {
  let template = templateMap[ctx.template || 'default'];
  if (template) {
    ctx.type = 'text/html';
    ctx.body = template.replace(/<!--content-->/, ctx.body);
  }
  await next();
});

app.listen(PORT || 3000);
