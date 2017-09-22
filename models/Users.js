/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/4
 * 历史修订：
 */
const db=require('../db').sequelize();
const userSchema=require('../schemas/Users');
module.exports=db.define('Users',userSchema);