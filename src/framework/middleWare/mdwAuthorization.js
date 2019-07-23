const {contextPath, authorization} = require('../config');
const {verifyToken} = require('../utils/tokenHandler');

module.exports = ()=>{
  return async (ctx, next) => {
    const {path} = ctx.request;
    console.log('path', path)
    if (authorization === false) {
      await next();
    } else {
      // eslint-disable-next-line
      if (path.replace(contextPath, '') === '/login' || path === contextPath || path === '/favicon.ico') {
        await next();
      } else {
        const token = ctx.request.headers.authorization;
        if (!token) {
          ctx.throw(401, 'token not be null');
        } else {
          const flag = await verifyToken(token);
          if (flag) {
            await next();
          } else {
            ctx.throw(401, 'token is out of date');
          }
        }
      }
    }
  }
}