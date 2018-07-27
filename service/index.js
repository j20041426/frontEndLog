/**
 * 作者:hzq
 * 文件说明:node服务器，入口文件
 * Creeated by hzq on 2018/7/2
 */
// const app = require('./api');
const models = require('./mySQL');
const express = require('express');
const app = express();
//监听端口为5000
app.listen(5000, () => console.log('**********【服务器启动成功】**********'));
