// 引入自己写的数据库配置文件
const models = require('./db');
// 引入express框架依赖
const express = require('express');
// 引入处理post数据的依赖
const bodyParser = require('body-parser');
const app = express();
// 解析应用程序/json
app.use(bodyParser.json());
// 解析应用程序/ X-WWW格式URL编码
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./dist'));

// 获取错误日志
app.post('/getError', (req, res) => {
	models.Error.find({}, (err, data) => res.send(err ? err : data));
});

// 保存错误日志
app.post('/saveError', (req, res) => {
	req.body.location = {};
	let ip =
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress ||
		'';
	ip = ip.match(/\d+.\d+.\d+.\d+/);
	req.body.location.ip = ip ? ip.join('.') : null;
	new models.Error(req.body).save(err =>
		res.send(err ? 'saveError fail' : 'saveError success')
	);
});

module.exports = app;
