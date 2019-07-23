module.exports = ()=>{
  const indexhtml = `<html><body>
      <form action="/api/login" method="post">
      <input name="username" type="text" placeholder="用户"/>
      <input name="password" type="password" placeholder="密码"/>
      <input type="submit" value="提交"/>
      </form>
      <form action="/api/file/upload" method="post" enctype="multipart/form-data">
        <input name="file" type="file" placeholder="点击上传文件"/>
        <input type="submit" value="提交"/>
      </form>
    </body></html>`;
  return indexhtml;
}