module.exports = () => {
  return async (ctx, next)=>{
    const method = ctx.request.method.toLowerCase();
    if (method === 'post' || method === 'put') {
      const bodyStr = ctx.request.body;
      if (typeof bodyStr === 'string') {
        try {
          const body = JSON.parse(bodyStr);
          ctx.request.body = body;
          await next();
        } catch (e) {
          console.log(e);
          ctx.throw(400, `param parse error ,${e.message}`);
        }
      } else {
        await next();
      }
    } else {
      await next();
    }
  }
}
