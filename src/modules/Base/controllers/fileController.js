const fs = require('fs');
const path = require('path');
const fileService = require('../services/fileService');

exports.upload = async ({request, response}) => {
  // 上传多个文件
  let files = request.files.file; // 获取上传文件
  if (!Array.isArray(files)) {
    files = [files];
  }
  const result = [];
  for (const file of files) {
    if (file.name) {
      // 创建可读流
      const readerStream = fs.createReadStream(file.path);
      // 获取上传文件扩展名
      const timeStamp = new Date().getTime();
      console.log(timeStamp)
      const savePath = `/public/upload/${timeStamp}.${file.name}`;
      const filePath = path.join(__dirname, `../../../..${savePath}`);
      // 创建可写流
      console.log(filePath);
      console.log(file.path);
      const writeStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      readerStream.pipe(writeStream);
      // writeStream.close();
      // readerStream.close();
      // 保存到数据库中id与路径的映射
      const fileId = await fileService.saveFile(savePath); //eslint-disable-line
      result.push(fileId);
    }
  }
  console.error('result', result)
  response.body = {
    result
  };
}

exports.download = async ({request, response, throw: throws}) => {
  const {id} = request.query;
  if (id) {
    const {filePath} = await fileService.get(id) || {};
    if (filePath) {
      const p = path.join(__dirname, `../../../..${filePath}`);
      const filename = getFileName(p);
      response.set('Content-disposition', `attachment;filename=${filename}`);
      response.set('Content-Type', '');
      response.body = fs.createReadStream(p);
    } else {
      throws(404, 'No such file.')
    }
  } else {
    throws(400, 'this request need param \'id\' property');
  }
}

function getFileName(filepath) {
  const fileFullName = filepath.split('/').pop();
  const fileName = fileFullName.substring(fileFullName.indexOf('.') + 1, fileFullName.length);
  return encodeURIComponent(fileName);
}