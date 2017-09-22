/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/9
 * 历史修订：
 */
const db=require('../db').sequelize();
const foodSchema=require('../schemas/foods');
module.exports=db.define('foods',foodSchema);