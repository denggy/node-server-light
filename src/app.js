#! /usr/bin/env node
const Koa = require('koa');
const mdwKoaBody = require('./framework/middleWare/mdwKoaBody');
const mdwJson = require('./framework/middleWare/mdwJson');
const mdwResponseSetting = require('./framework/middleWare/mdwResponseSetting');
const mdwLog = require('./framework/middleWare/mdwLog');
const mdwErrorHandle = require('./framework/middleWare/mdwErrorHandle');
const mdwAuthorization = require('./framework/middleWare/mdwAuthorization');
const mdwRouterHandle = require('./framework/middleWare/mdwRouterHandle');
const mdwSession = require('./framework/middleWare/mdwSession');
const {port} = require('./framework/config');

const app = new Koa();

// koa-body
app.use(mdwKoaBody());

// json
app.use(mdwJson());

// 日志处理
app.use(mdwLog());

// 设置响应头
app.use(mdwResponseSetting());

// 设置session
app.use(mdwSession(app));

// 错误处理
app.use(mdwErrorHandle());

// 权限处理
app.use(mdwAuthorization());

// 路由加载
app.use(mdwRouterHandle());

app.listen(port, ()=>{
  console.log(`the server is running, port : ${port}`);
});