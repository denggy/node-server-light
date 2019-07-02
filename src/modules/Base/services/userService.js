const {BaseDao} = require('../../../dao/BaseDao');
const {generateToken} = require('../../../framework/utils/tokenHandler');


const tableName = 'USER';
const userDao = new BaseDao(tableName);

exports.getUserList = async (param) => {
  return await userDao.query(param);
}

exports.addUser = async (user) => {
  return await userDao.save(user);
}

exports.get = async (id) => {
  return await userDao.get(id);
}

exports.delete = async (id) => {
  return await userDao.delete(id);
}

exports.update = async (user) => {
  return await userDao.update(user);
}

exports.login = async (inputs) => {
  const {username, password} = inputs;
  if (username === 'admin' && password === '123456') {
    const token = generateToken(username);
    return {
      token
    }
  } else {
    return {
      message: '用户名不存在或密码错误！'
    }
  }
}