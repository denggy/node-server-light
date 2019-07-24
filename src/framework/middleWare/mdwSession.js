const session = require('koa-session');
const path = require('path');
const fs = require('fs');

const store = {
  get(key) {
    const sessionDir = path.resolve(__dirname, '../../../public/session');
    const files = fs.readdirSync(sessionDir);

    for (let i = 0; i < files.length; i++) {
      if (files[i].startsWith(key)) {
        const filepath = path.resolve(sessionDir, files[i]);
        delete require.cache[require.resolve(filepath)];
        const result = require(filepath);
        return result;
      }
    }
  },
  set(key, sess) {
    const filePath = path.resolve(__dirname, '../../../public/session', `${key}.js`);
    const content = `module.exports = ${JSON.stringify(sess)};`;

    fs.writeFileSync(filePath, content);
  },

  destroy(key) {
    const filePath = path.resolve(__dirname, '../../../public/session', `${key}.js`);
    fs.unlinkSync(filePath);
  }
}

const CONFIG = {
  key: 'koa:session:node-server-light', // cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, // 是否可以overwrite    (默认default true)
  httpOnly: true, // cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, // 签名默认true
  rolling: false, // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, // (boolean) renew session when session is nearly expired,
  store
};
const keys = ['node-server-light'];
module.exports = (app)=> {
  app.keys = keys;
  return session(CONFIG, app);
}