const { logger } = require('../utils/logHandler');

module.exports = ()=>{
  return async (ctx, next) => {
    await next().catch((err) => {
      console.log('login error', err);
      logger.error(err);
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          result: {
            code: err.status,
            message: 'You do not have access to this resource'
          }
        };
      } else {
        ctx.status = err.status;
        ctx.body = {
          result: {
            code: err.status,
            message: err.message
          }
        };
      }
    })
  }
}