var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '39.106.58.84',
	user: 'root',
	password: 'JT_db_pwd$2017',
	database: 'frontEndLog'
});

connection.connect();

var sql = 'SELECT * FROM runTimelog';
//查
connection.query(sql, function(err, result) {
	if (err) {
		console.log('[SELECT ERROR] - ', err.message);
		return;
	}

	console.log('--------------------------SELECT----------------------------');
	console.log(result);
	console.log(
		'------------------------------------------------------------\n\n'
	);
});

var addSql = 'INSERT INTO runTimelog(name,url,alexa,country) VALUES(?,?,?,?)';
var addSqlParams = ['菜鸟工具', 'https://c.runoob.com', '', '23453', 'CN'];
//增
connection.query(addSql, addSqlParams, function(err, result) {
	if (err) {
		console.log('[INSERT ERROR] - ', err.message);
		return;
	}

	console.log('--------------------------INSERT----------------------------');
	//console.log('INSERT ID:',result.insertId);
	console.log('INSERT ID:', result);
	console.log(
		'-----------------------------------------------------------------\n\n'
	);
});
connection.end();
