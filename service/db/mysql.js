var mysql = require('mysql');
var pool = mysql.createPool({
    host: '00.00.00.00',
    user: 'sdfasf',
    password: 'adfasdf',
    database: 'frontEndLog',
    port: 3306
});
/**
 * 获取 mysql 的链接
 * @param sql
 * @param values
 * @returns {Promise<any>}
 */
let connection = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                resolve(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

// 查询列表数据
let getList = function(value) {
    let _sql = '';
    if (value.currTab === 'code') {
        _sql = 'SELECT * FROM runTimelog order by createDate desc';
    } else {
        _sql = 'SELECT * FROM APILog order by createDate desc';
    }
    return connection(_sql, value);
};

/**
 *  数据储存
 * @param value 为参数
 * @returns {Promise<any>}
 */
let addInfos = function(value) {
    let _array = [];
    let _par = '';
    let _val = '';
    for (let item in value) {
        _array.push(value[item]);
        _par += item + ',';
        _val += '?,';
    }
    _par = _par.substr(0, _par.length - 1);
    _val = _val.substr(0, _val.length - 1);
    let _sql = '';
    if (value.errType === '接口错误') {
        _sql = 'INSERT INTO APILog(' + _par + ') VALUES(' + _val + ')';
    } else {
        _sql = 'INSERT INTO runTimelog(' + _par + ') VALUES(' + _val + ')';
    }
    return connection(_sql, _array);
};

module.exports = {
    getList,
    addInfos
};
