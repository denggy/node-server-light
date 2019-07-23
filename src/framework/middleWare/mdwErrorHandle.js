const { logger } = require('../utils/logHandler');

module.exports = ()=>{
  return async (ctx, next) => {
    const result = await next().catch((err) => {
      console.log('noAuth', err);
      logger.error(err);
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = 'You do not have access to this resource';
      } else {
        throw err;
      }
    })
    return result;
  }
}