/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/9
 * 历史修订：
 */
const Sequelize = require('sequelize');
module.exports={
    food_name: {
        type: Sequelize.STRING,      //字段类型string
    },
    limit:{
        type: Sequelize.INTEGER,
        defaultValue: 999999,
    }
};
