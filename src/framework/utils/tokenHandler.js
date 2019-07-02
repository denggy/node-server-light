const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const verify = Promise.promisify(jwt.verify);

const sign = 'node-server-light';
const days = 1;

exports.generateToken = (username)=>{
  const payload = {
    username,
    time: Date.now(),
    timeout: 1000 * 60 * 60 * 24 * days// 1天
  }

  return jwt.sign(payload, sign);
}


exports.verifyToken = async (token)=>{
  return new Promise(async (resolve)=>{
    const payload = await verify(token, sign).catch(()=>{
      resolve(false)
    });
    const { time, timeout } = payload;
    const date = Date.now();
    if (date - time <= timeout) {
      // 未过期
      resolve(true)
    } else {
      resolve(false)
    }
  });
}