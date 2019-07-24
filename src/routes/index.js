const fs = require('fs');
const path = require('path');
const userCtrl = require('../modules/Base/controllers/userController.js');
const fileCtrl = require('../modules/Base/controllers/fileController.js');
const captchaCtrl = require('../modules/Base/controllers/captchaController.js');
const indexPage = require('../pages');
// const image = require('../pages/favicon.ico');

const index = (ctx) => {
  ctx.type = 'text/html;charset=utf-8';
  ctx.response.body = indexPage();
}

const favicon = (ctx) =>{
  const p = path.join(__dirname, '../pages/favicon.ico');
  const image = fs.createReadStream(p);
  ctx.type = 'image/png';
  ctx.body = image;
}

const routerConfig = {
  name: 'myTestRoute',
  routes: [{
    path: '/',
    controller: index
  },
  {
    path: '/file/upload',
    controller: fileCtrl.upload,
    method: 'post'
  },
  {
    path: '/file/download',
    controller: fileCtrl.download,
    method: 'get'
  },
  {
    path: '/user/getUserList',
    controller: userCtrl.getUserList,
    method: 'get'
  },
  {
    path: '/user/getUserById',
    controller: userCtrl.getUserById,
    method: 'get'
  },
  {
    path: '/user/addUser',
    controller: userCtrl.addUser,
    method: 'post'
  },
  {
    path: '/user/delUserById',
    controller: userCtrl.delUserById,
    method: 'delete'
  },
  {
    path: '/user/updateUser',
    controller: userCtrl.updateUser,
    method: 'put'
  },
  {
    path: '/login',
    controller: userCtrl.login,
    method: 'post'
  },
  {
    path: '/captcha',
    controller: captchaCtrl.captcha,
  },
  {
    path: '/favicon.ico',
    controller: favicon,
  }]
}


module.exports = routerConfig;