var mysql = require('mysql');
var pool = mysql.createPool({
	host: '39.106.58.84',
	user: 'root',
	password: 'JT_db_pwd$2017',
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
	let _sql = 'SELECT * FROM runTimelog';
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
	for (let item in value) {
		_array.push(value[item]);
		_par += item + ',';
	}
	_par = _par.substr(0, _par.length - 1);
	let _sql =
		'INSERT INTO runTimelog(' +
		_par +
		') VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	return connection(_sql, _array);
};

module.exports = {
	getList,
	addInfos
};
