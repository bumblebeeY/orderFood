/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/8/10
 * 历史修订：
 */
/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/7/15
 * 历史修订：
 */
/**
 * 格式化日期
 * @param date:传入的日期
 * @param format：格式字符串
 * @returns {*} :返回结果
 */
function formatDate(date, format) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
}
/**
 * 将字符串以URL编码
 * @param Str：传入的字符串
 * @returns {string} 返回值
 * @constructor
 */
function URLEncode(Str) {
    if (Str == null || Str == "")
        return "";
    var newStr = "";

    function toCase(sStr) {
        return sStr.toString(16).toUpperCase();
    }

    for (var i = 0, icode, len = Str.length; i < len; i++) {
        icode = Str.charCodeAt(i);
        if (icode < 0x10)
            newStr += "%0" + icode.toString(16).toUpperCase();
        else if (icode < 0x80) {
            if (icode == 0x20)
                newStr += "+";
            else if ((icode >= 0x30 && icode <= 0x39) || (icode >= 0x41 && icode <= 0x5A) || (icode >= 0x61 && icode <= 0x7A))
                newStr += Str.charAt(i);
            else
                newStr += "%" + toCase(icode);
        }
        else if (icode < 0x800) {
            newStr += "%" + toCase(0xC0 + (icode >> 6));
            newStr += "%" + toCase(0x80 + icode % 0x40);
        }
        else {
            newStr += "%" + toCase(0xE0 + (icode >> 12));
            newStr += "%" + toCase(0x80 + (icode >> 6) % 0x40);
            newStr += "%" + toCase(0x80 + icode % 0x40);
        }
    }
    return newStr;
}

/**
 * 将数字转换为科学计数法
 * @param num 传入的数字
 * @returns {string}
 */
function scientificNum(num) {
    var sign = "";
    var newStr = "";
    var count = 0;
    var str = num.toString();
    //若数值是负数
    if (str.charAt(0) == "-") {
        str = str.substr(1);
        sign = "-";
    }
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr; //自动补小数点后两位
    }
    else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + str.substr(str.indexOf("."), 3);
    }
    return sign + str;
}

/**
 * 验证手机号码
 * @param objVal：待验证值
 * @returns {number}：验证结果code 0:验证通过 1：空手机号 2：手机号格式不正确
 */
function checkPhone(objVal) {
    var msgType=0;
    if (objVal.length <= 0) {
        msgType=1;
    } else if (!/(^1[3|5|7|8][0-9]{9}$)/.test(objVal)) {
        msgType=2;
    }
    return msgType;
}
module.exports={formatDate,URLEncode,scientificNum,checkPhone};