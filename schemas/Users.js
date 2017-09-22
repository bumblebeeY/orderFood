/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/4
 * 历史修订：
 */
const Sequelize = require('sequelize');
module.exports={
    phone: {
        type: Sequelize.STRING,      //字段类型string
        allowNull: false,            //是否允许为空
        unique: false                 //是否唯一
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue: "http://xxxx.com/default_avatar.png"      //设置默认值
    },
    gender: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: function () {
            return "ytx_" + parseInt(Math.random() * 1000);
        }     //默认值可以通过函数返回
    }
};