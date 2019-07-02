const {dbType} = require('../framework/config')

exports.BaseDao = function BaseDao(tableName) {
  if (dbType === 'sqlite') {
    console.log('init sqliteDao', this)
    const {SqliteDao} = require('./sqlite');
    return new SqliteDao(tableName);
  } else if (dbType === 'mongo') {
    console.log('init mongoDao')
    const {MongoDao} = require('./mongo');
    return new MongoDao(tableName);
  }
}