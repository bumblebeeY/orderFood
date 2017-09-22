// 引入 ws 支持 WebSocket 的实现
const WebSocket = require('ws');
// 引入 url 模块用于解析 URL
const url = require('url');
let foods=require('./controllers/foods');

// 导出处理方法
exports.listen = listen;

/**
 * 在 HTTP Server 上处理 WebSocket 请求
 * @param {http.Server} server
 * @param {wafer.SessionMiddleware} sessionMiddleware
 */
function listen(server, sessionMiddleware) {
    // 使用 HTTP Server 创建 WebSocket 服务，使用 path 参数指定需要升级为 WebSocket 的路径
    const wss = new WebSocket.Server({ server});
// 同时支持 /ws 和 /game 的 WebSocket 连接请求
    wss.shouldHandle = (request) => {
        const path = url.parse(request.url).pathname;
        request.path = path;
        return ['/orderFood', '/updateOrder'].indexOf(path) > -1;
    };
    // 监听 WebSocket 连接建立
    wss.on('connection', (ws,request) => {// 要升级到 WebSocket 协议的 HTTP 连接

        // 被升级到 WebSocket 的请求不会被 express 处理，
        // 需要使用会话中间节获取会话
        sessionMiddleware(request, null, () => {
            const session = request.session;
            if (!session) {
                // 没有获取到会话，强制断开 WebSocket 连接
                ws.send(JSON.stringify(request.sessionError) || "No session avaliable");
                ws.close();
                return;
            }
            // 保留这个日志的输出可让实验室能检查到当前步骤是否完成
            console.log(`WebSocket client connected with openId=${session.userInfo.openId}`);
            // 根据请求的地址进行不同处理
            switch (request.path) {
                case '/orderFood': return  addOrderMsg(wss,ws, session.userInfo);
                case '/updateOrder': return updateOrderMsg(wss,ws, session.userInfo.openId);
                default: return ws.close();
            }
        });
    });

    // 监听 WebSocket 服务的错误
    wss.on('error', (err) => {
        console.log(err);
    });
}

/**
 * 进行简单的 WebSocket 服务，对于客户端发来的所有消息都回复回去
 */
function addOrderMsg(wss,ws, userInfo) {
    // 监听客户端发来的消息
    ws.on('message', (message) => {
      foods.addOrders(message,userInfo,function () {
          wss.clients.forEach(function each(client) {
              if (client.readyState === WebSocket.OPEN) {
                  client.send("aaaaaaaaa");
              }
          });
      });
    });

    // 监听关闭事件
    ws.on('close', (code, message) => {
        console.log(`WebSocket client closed (code: ${code}, message: ${message || 'none'})`);
    });
}
/**
 * 进行简单的 WebSocket 服务，对于客户端发来的所有消息都回复回去
 */
function updateOrderMsg(wss,ws, openId) {
    // 监听客户端发来的消息
    ws.on('message', (message) => {
        foods.updateOrders(message,openId,function () {
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("aaaaaaaaa");
                }
            });
        });
    });
}
