const {BaseDao} = require('../../../dao/BaseDao');

const tableName = 'FILE';
const fileDao = new BaseDao(tableName);

exports.saveFile = async (filePath) => {
  const file = {
    filePath
  }
  return await fileDao.save(file);
}

exports.get = async (fileId) => {
  return await fileDao.get(fileId);
}
