/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/10
 * 历史修订：
 */
const db=require('../db').sequelize();
const orderSchema=require('../schemas/orders');
module.exports=db.define('foods_orders',orderSchema);