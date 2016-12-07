const setUserState = require("../model/setUserState")

const setUserWeChat = require("../model/setUserWeChat")

const setUserName = require("../model/setUserName")

const registerString = `欢迎进入注册流程：

请根据下列步骤进行注册
回复菜单项前的字母进行操作
=================

a 输入您的微信ID
b 输入您的昵称
c 查看并确认您输入的微信ID和昵称
d 退出注册流程

`
/**
 * 0 - 回复注册，还没有进行后续操作
 * 1 - 回复a，还没有进行后续操作
 * 2 - 微信号输入完毕
 * 3 - 回复b，还没有进行后续操作
 * 4 - 回复c，还没有进行后续操作
 * null - 没有在注册流程中
 * 
 * 检查用户是否注册
 * @param  {Array} content 用户回复内容数组
 * @param  {Object} rData   用户信息
 * @return {String}         公众号回复内容
 */
const checkReg = data => {
    if (/注册/.test(data.Content[0])) {
        setUserState(data.ToUserName[0], "0")
        return registerString
    } else {
        return "暂不支持未注册用户，回复【注册】进入注册流程"
    }
}

const checkWechatId = data => {
    if (data.Content[0] === "a" || data.Content[0] === "A") {
        setUserState(data.ToUserName[0], "1")
        return "请输入您的微信ID"
    }

    return registerString
}

const changeWechatId = data => {
    const testWechatId = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}/g
    if (testWechatId.test(data.Content[0])) {
        setUserWeChat(data.ToUserName[0], data.Content[0])
        setUserState(data.ToUserName[0], "2")
        return `您的微信号为${data.Content[0]}, 输入b进入下一步`
    }

    return "请输入正确的微信号"
}

const checkUserName = data => {
    if (data.Content[0] === "b" || data.Content[0] === "B") {
        setUserState(data.ToUserName[0], "3")
        return "请输入您的昵称"
    }

    return "输入b进入下一步"
}

const changeUserName = data => setUserName(data.ToUserName[0], data.Content[0]);

const register = (data, rData) => {
    const userId = data.ToUserName[0]
    switch(rData.status){
        case "0":
            return checkWechatId(data)
        case "1":
            return changeWechatId(data)
        case "2":
            return checkUserName(data)
        case "3":
            return changeUserName(data)    
        default:
            return checkReg(data)
    }
}

module.exports = register;