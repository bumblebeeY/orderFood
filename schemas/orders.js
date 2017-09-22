/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/9
 * 历史修订：
 */
const Sequelize = require('sequelize');
module.exports = {
    user_id: {
        type: Sequelize.STRING,      //字段类型string
    },
    user_name:{
        type: Sequelize.STRING,      //字段类型string
    },
    food_type: {
        type: Sequelize.INTEGER,
        allowNull: false,            //是否允许为空
    },
    order_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0//是否允许为空
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,            //是否允许为空
    },
};
