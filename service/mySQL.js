var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '39.106.58.84',
	user: '3306',
	password: 'JT_db_pwd$2017'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
	if (err) throw err;
	console.log('The solution is: ', rows[0].solution);
});

connection.end();
