const userCtrl = require('../modules/Base/controllers/userController.js');
const fileCtrl = require('../modules/Base/controllers/fileController.js');

const index = (ctx) => {
  ctx.type = 'text/html;charset=utf-8';
  ctx.response.body = `<html><body>
      <form action="http://localhost:3000/api/login" method="post">
      <input name="username" type="text" placeholder="用户"/>
      <input name="password" type="password" placeholder="密码"/>
      <input type="submit" value="提交"/>
      </form>
    </body></html>`;
}

// module.exports = {
//   '/': [index],
//   '/upload': [fileCtrl.upload, 'post'],
//   '/download': [fileCtrl.download],
//   '/user/getUserList': [userCtrl.getUserList],
//   '/user/getUserById': [userCtrl.getUserById],
//   '/user/addUser': [userCtrl.addUser, 'post'],
//   '/user/delUserById': [userCtrl.delUserById, 'delete'],
//   '/user/updateUser': [userCtrl.updateUser, 'put'],
// }

const routerConfig = {
  name: 'myTestRoute',
  routes: [{
    path: '/',
    controller: index
  },
  {
    path: '/upload',
    controller: fileCtrl.upload,
    method: 'post'
  },
  {
    path: '/download',
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