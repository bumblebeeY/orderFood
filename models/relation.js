/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/10
 * 历史修订：
 */
const db=require('../db').sequelize();
let users = require('./Users');
let orders = require('./orders');
let foods = require('./foods');

// users.hasMany(orders,{foreignKey:'user_id', targetKey:'id', as:'Orders'});
foods.hasMany(orders,{foreignKey:'food_type',  targetKey:'id',as:'Orders'});
orders.belongsTo(foods,{foreignKey: 'food_type'});
// orders.belongsTo(users,{foreignKey: 'user_id'});
// 同步模型到数据库中
db.sync();

exports.Users = users;
exports.Orders = orders;
exports.Foods = foods;