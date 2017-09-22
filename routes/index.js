
let foods=require('../controllers/foods');
module.exports = function (app) {
    // 在路由 /me 下，输出会话里包含的用户信息
    app.use('/me', (req, res, next) => {
        res.json(req.session ? req.session.userInfo : { noBody: true });
        if (req.session) {
            console.log(`Wafer session success with openId=${req.session.userInfo.openId}`);
        }
    });
    //食品路由
    app.get('/foods/foodCounts', foods.foodCounts);

    // 实现一个中间件，对于未处理的请求，都输出 "Response from express"
    app.use((req, res, next) => {
        res.write('Response from express');
        res.end();
    });
};
