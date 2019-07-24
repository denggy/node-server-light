module.exports = ()=>{
  const indexhtml = `<html>
      <link rel="shortcut icon" href=/api/favicon.ico type=image/x-icon>
      <body>
      <form action="/api/login" method="post">
      <input name="username" type="text" placeholder="用户"/>
      <input name="password" type="password" placeholder="密码"/>
      <div>
        <input name="captcha" placeholder="验证码"/>
        <img src="/api/captcha" />
      </div>
      <input type="submit" value="提交"/>
      </form>
      <form action="/api/file/upload" method="post" enctype="multipart/form-data">
        <input name="file" type="file" placeholder="点击上传文件"/>
        <input type="submit" value="提交"/>
      </form>
    </body>
    </html>`;
  return indexhtml;
}