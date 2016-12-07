const client = require("../model/redis");
/**
 * 0 - 回复注册，还没有进行后续操作
 * 1 - 回复a，还没有进行后续操作
 * 2 - 回复b，还没有进行后续操作
 * 3 - 回复c，还没有进行后续操作
 * null - 没有在注册流程中
 * 
 * 检查用户是否注册
 * @param  {Array} content 用户回复内容数组
 * @param  {Object} rData   用户信息
 * @return {String}         公众号回复内容
 */
const checkReg = (data, rData) => {
    if (/注册/.test(data.Content[0])) {
        client.hmset(data.ToUserName[0], {"status": "0"})
        return `欢迎进入注册流程：

请根据下列步骤进行注册
回复菜单项前的字母进行操作
=================

a 输入您的微信ID
b 输入您的昵称
c 查看并确认您输入的微信ID和昵称
d 退出注册流程

`
    } else {
        return "暂不支持未注册用户，回复【注册】进入注册流程"
    }
}

module.exports = checkReg;