/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/10
 * 历史修订：
 */
// 引用模型
let Foods = require('../models/relation').Foods;
let Orders = require('../models/relation').Orders;
// let User = require('../models/relation').Users;
let Util = require('../util');
const Sequelize = require('sequelize');
exports.foodCounts = function (req, res, next) {
    if (req.session) {
        let finclude = {
            model: Foods,
            required: true,
            attributes: [['food_name', 'foodName'],'limit', 'id'],
        };
        Promise.all([Orders.findAll({
            include: finclude,
            attributes: [[Sequelize.fn('SUM', Sequelize.col('order_num')), 'orderNum']],
            group: 'food_type',
            plain: false,
            where: {
                createdAt: {
                    $gt: Sequelize.fn('DATE', Util.formatDate(new Date(), "yyyy-MM-dd 00:00:00")),
                    $lt: Sequelize.fn('DATE', Util.formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "yyyy-MM-dd 00:00:00"))
                }
            }
        }), Orders.findAll({
            include: finclude,
            attributes:['user_name','order_num','status','createdAt'],
            where: {
                createdAt: {
                    $gt: Sequelize.fn('DATE', Util.formatDate(new Date(), "yyyy-MM-dd 00:00:00")),
                    $lt: Sequelize.fn('DATE', Util.formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "yyyy-MM-dd 00:00:00"))
                }
            }
        }), Orders.findAll({
                include: finclude,
                attributes:['user_name','food_type','order_num','status','createdAt'],
                where: {
                    createdAt: {
                        $gt: Sequelize.fn('DATE', Util.formatDate(new Date(), "yyyy-MM-dd 00:00:00")),
                        $lt: Sequelize.fn('DATE', Util.formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "yyyy-MM-dd 00:00:00"))
                    },
                    user_id:req.session.userInfo.openId,
                },
            limit:1
            })]).then(function (arr) {
            res.json({
                code:0,
                foodList:arr[0],
                orderList:arr[1],
                userOrder:arr[2],
            });
        })
    }else{
        res.json({
            code:1,
            message:'微信登录失败！无法点餐！',
        });
    }
};
exports.addOrders=function (msg,userInfo,next) {
   msg=JSON.parse(msg);
    Orders.create({
        user_id:userInfo.openId,
        user_name:userInfo.nickName,
        food_type:msg.food_type,
        order_num:msg.order_num,
        status:msg.status
    }).then(function () {
      next();
    })
};
exports.updateOrders=function (msg,openId,next) {
    Orders.update({status:1},{
        where:{
            user_id: openId
        }
    }).then(function () {
        next();
    })
};
