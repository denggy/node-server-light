const router = require('koa-router')();
const {routes} = require('../../routes');
const {contextPath} = require('../config');

routes.forEach((route)=>{
  const {path, controller, method = 'get'} = route;
  const p = (contextPath === undefined || contextPath === '/') ? path : `${contextPath}${path}`;
  router[method](p, controller);
});

module.exports = ()=> router.routes();