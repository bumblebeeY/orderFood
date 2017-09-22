// HTTP 模块同时支持 Express 和 WebSocket
const http = require('http');
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
const app = express();
// 引用 wafer-session 支持小程序会话
const waferSession=require('wafer-node-session');
// 使用 MySqlDb 作为会话的存储
const MySQLStore = require('express-mysql-session')(waferSession);
// 引入配置文件
const config=require('./config');
// 引入 WebSocket 服务实现
const websocket = require('./websocket');

// 会话中间件
const sessionMiddleware=waferSession({
    appId:config.appId,
    appSecret:config.appSecret,
    loginPath:'/login',
    store:new MySQLStore({
        host: config.mysqlHost,
        port: config.mysqlPort,
        user: config.mysqlUser,
        password:config.mysqlPass,
        database:config.mysqlDb
    })
});
app.use(sessionMiddleware);

//路由
require('./routes/index')(app);

// 创建 HTTP Server 而不是直接使用 express 监听
const server=http.createServer(app);
// 让 WebSocket 服务在创建的 HTTP 服务器上监听
websocket.listen(server,sessionMiddleware);
//启动HTTP服务

server.listen(config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);
