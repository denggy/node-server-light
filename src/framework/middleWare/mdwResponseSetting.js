module.exports = ()=>{
  return async (ctx, next) => {
    const res = ctx.response;
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'content-type');
    res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.set('Content-Type', 'application/json;charset=utf-8');
    await next();
  }
}