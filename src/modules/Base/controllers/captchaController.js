const svgCaptcha = require('svg-captcha');

exports.captcha = (ctx) => {
  var captcha = svgCaptcha.create();
  ctx.body = captcha.data;
  ctx.type = 'svg';
  ctx.session.captcha = captcha.text.toLocaleLowerCase();
}
