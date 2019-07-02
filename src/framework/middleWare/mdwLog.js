module.exports = ()=>{
  return async (ctx, next) => {
    const {request} = ctx;
    const {url} = request;
    console.info(`${url}`)
    await next();
  }
}