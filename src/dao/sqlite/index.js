const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const file = `${__dirname}/sqlite.db`;

const printErrorInfo = function (err) {
  console.log(`Error:${err.message}`);
}

const sortFunction = () => {
  /** lodash
   const _ = require('lodash');
   const users = [
   { 'user': 'fred',   'age': 48 },
   { 'user': 'barney', 'age': 34 },
   { 'user': 'fred',   'age': 42 },
   { 'user': 'barney', 'age': 36 }
   ];

   // 以 `user` 升序排序 再 以 `age` 降序排序。
   **/
  // _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
}

// 处理查询结果
const queryResultFunction = (rows, param) => {
  const result = [];
  rows.forEach((r) => {
    const item = {
      ...JSON.parse(r.info),
      id: r.rowid
    }
    console.log(param.query)
    if (param.query) {
      if (Object.values(item)
        .toString()
        .includes(param.query)) {
        result.push(item)
      }
    } else {
      result.push(item)
    }
  });
  return result;
}

const sqliteDao = function (tableName) {
  if (!tableName) {
    throw Error('500', 'You must input "tableName" !')
  }
  this.db = new sqlite3.Database(file);
  if (!fs.existsSync(file)) {
    console.log('Creating db file!');
    fs.openSync(file, 'w');
  }
  this.db.serialize(() => {
    this.db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (info TEXT)`);
  });
  this.query = (param) => {
    return new Promise((resolve, reject) => {
      let querySql = `SELECT rowid, info FROM ${tableName}`;
      if (param.query) {
        querySql += ` WHERE info LIKE '%${param.query}%'`;
      }
      this.db.serialize(() => {
        this.db.all(querySql, (err, rows) => {
          if (err != null) {
            printErrorInfo(err);
            resolve(err);
            return;
          }
          resolve(queryResultFunction(rows, param));
          // this.db.close();
        })
      });
    });
  }
  this.save = (entry) => {
    return new Promise((resolve, reject) => {
      const insertSql = `INSERT INTO ${tableName}(info) values(?)`;
      this.db.serialize(() => {
        try {
          this.db.run(insertSql, JSON.stringify(entry), function (err) {
            if (err !== null) {
              printErrorInfo(err);
              resolve(err);
            } else {
              resolve(this.lastID);
            }
          })
        } catch (e) {
          console.log(e);
          resolve(e.message);
        }
        // this.db.close();
      });
    });
  }
  this.get = (id) => {
    return new Promise((resolve, reject) => {
      const querySql = `SELECT * FROM ${tableName} WHERE rowid = ?`;
      this.db.serialize(() => {
        this.db.get(querySql, id, (err, record) => {
          if (err !== null) {
            printErrorInfo(err);
            resolve(err);
          } else {
            if (record) {
              try {
                resolve({
                  ...JSON.parse(record.info),
                  id
                });
              } catch (e) {
                console.error(e);
                resolve(e.message);
              }
            } else {
              resolve(null);
            }
          }
          // this.db.close();
        })
      });
    });
  }
  this.delete = (id) => {
    return new Promise((resolve, reject) => {
      const deleteSql = `DELETE FROM ${tableName} WHERE rowid = ?`;
      if (id) {
        this.db.serialize(() => {
          this.db.run(deleteSql, id, function (err, record) {
            if (err !== null) {
              printErrorInfo(err);
              resolve(err);
            } else {
              if (this.changes === 1) {
                resolve('ok');
              } else {
                // resolve('There is no record that can be deleted.');
                throw Error('500', 'There is no record that can be deleted.');
              }
            }
            // this.db.close();
          });
        });
      } else {
        resolve('\'Id\' is required.');
      }
    });
  }
  this.update = (entry) => {
    return new Promise((resolve, reject) => {
      const updateSql = `UPDATE ${tableName} SET info = ? WHERE rowid = ?`;
      const {id} = entry;
      if (id) {
        delete entry.id;
        this.db.serialize(() => {
          this.db.run(updateSql, JSON.stringify(entry), id, function (err) {
            if (err !== null) {
              printErrorInfo(err);
              resolve(err);
            } else {
              if (this.changes === 1) {
                resolve('ok');
              } else {
                resolve('There is no record that can be modified.');
              }
            }
            // this.db.close();
          })
        })
      } else {
        resolve('The entry must contains \'id\' property');
      }
      // this.db.close();
    });
  }
}


exports.SqliteDao = sqliteDao;