const userCtrl = require('../modules/Base/controllers/userController.js');
const fileCtrl = require('../modules/Base/controllers/fileController.js');
const indexPage = require('../pages');

const index = (ctx) => {
  ctx.type = 'text/html;charset=utf-8';
  ctx.response.body = indexPage();
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
  }]
}


module.exports = routerConfig;