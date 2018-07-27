const mongoose = require("mongoose");//引入mongoose依赖
// 连接mongodb数据库
// 参数1：mongodb数据库启动的地址
// 参数2：回调函数，用于判断是否连接成功
mongoose.connect("mongodb://localhost/Test", err => {
    if (err) console.log("**********【数据库连接失败】**********");
    else console.log("**********【数据库连接成功】**********");
});

/************** 定义模式Schema **************/
// Schema是Mongoose里的数据模式，可以理解为表结构定义；每个Schema会映射到MongoDB中的一个Collection，不具备操作数据库的能力

// 错误
const errorSchema = new mongoose.Schema({
    general: {
        time: Date,
        proName: String,
        proUrl: String
    },
    stack: String,
    error: {
        message: String,
        filename: String,
        colno: String,
        lineno: String
    },
    device: {
        browser: String,
        browserV: String,
        device: String,
        system: String
    },
    location: {
        ip: String,
        address: String
    }
});
/************** 定义模型Model **************/
// 要导出的模型Model
const Models = {
    Error: mongoose.model("Error", errorSchema)
}
module.exports = Models;