/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/4
 * 历史修订：
 */
let Sequelize = require('sequelize');
const config = require('./config');

exports.sequelize = function () {
    return new Sequelize(
        config.mysqlDb,
        config.mysqlUser,
        config.mysqlPass,
        {
            'dialect': 'mysql',  // 数据库使用mysql
            'host': config.mysqlHost, // 数据库服务器ip
            'port': config.mysqlPort,        // 数据库运行端口
            'timestamp': true    // 这个参数为true是MySQL会自动给每条数据添加createdAt和updateAt字段
        }
    );
};