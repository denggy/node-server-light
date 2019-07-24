const ccap = require('ccap')();

exports.captcha = (ctx) => {
  const ary = ccap.get();
  const txt = ary[0];
  const buf = ary[1];
  ctx.body = buf;
  ctx.type = 'image/png';
  ctx.session.captcha = txt.toLowerCase();
}