const mongoDao = function mongoDao(tableName) {
  console.log(tableName);
  if (!tableName) {
    throw Error('500', 'You must input "tableName" !')
  }
}
exports.MongoDao = mongoDao;
