const setUserState = require("../model/setUserState")

const setUserWeChat = require("../model/setUserWeChat")

const setUserName = require("../model/setUserName")

const setUserReadyState = require("../model/setUserReadyState")

const registerString = `欢迎进入注册流程：

请根据下列步骤进行注册
回复菜单项前的字母进行操作
=================

a 输入您的微信ID
b 输入您的昵称
c 查看并确认您输入的微信ID和昵称
d 退出注册流程

`
const makeSure = rData => `您的微信号为${rData.wechat},您的昵称为${rData.name}

输入Y确认

输入N放弃

之后可以回复a
===========
输入d退出注册流程`
/**
 * 0 - 回复注册，还没有进行后续操作
 * 1 - 回复a，还没有进行后续操作
 * 2 - 微信号输入完毕
 * 3 - 回复b，还没有进行后续操作
 * 4 - 用户名设置完毕
 * 5 - 回复c，还没有进行后续操作
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

const quit = data => data.Content[0] === "d" || data.Content[1] === "D" && setUserState(data.ToUserName[0], "null")

const checkWechatId = data => {
    if (data.Content[0] === "a" || data.Content[0] === "A") {
        setUserState(data.ToUserName[0], "1")
        return "请输入您的微信ID"
    }

    return quit(data) || registerString
}

const changeWechatId = data => {
    const testWechatId = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}/g
    if (testWechatId.test(data.Content[0])) {
        setUserWeChat(data.ToUserName[0], data.Content[0])
        setUserState(data.ToUserName[0], "2")
        return `您的微信号为${data.Content[0]}, 输入b进入下一步`
    }

    return quit(data) || "请输入正确的微信号"
}

const checkUserName = data => {
    if (data.Content[0] === "b" || data.Content[0] === "B") {
        setUserState(data.ToUserName[0], "3")
        return "请输入您的昵称"
    }

    return quit(data) || "输入b进入下一步"
}

const changeUserName = data => {
    setUserName(data.ToUserName[0], data.Content[0])
    setUserState(data.ToUserName[0], "4")

    return quit(data) || `您的昵称为${data.Content[0]}, 输入c进入下一步`
};

const checkUserInfo = (data, rData) => {
    if (data.Content[0] === "c" || data.Content[0] === "C") {
        setUserState(data.ToUserName[0], "5")
        return makeSure(rData)
    }

    return quit(data) || "输入c进入下一步"
}

const changeUserInfo = (data, rData) => {
    if (data.Content[0] === "y" || data.Content[0] === "Y") {
        setUserReadyState(data.ToUserName[0], "true")
        return "注册完成！"
    } else if (data.Content[0] === "n" || data.Content[0] === "N") {
        setUserState(data.ToUserName[0], "0")
        return registerString
    }

    return quit(data) || makeSure(rData)
}

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
        case "4":
            return checkUserInfo(data, rData)
        case "6":
            return changeUserInfo(data, rData)
        default:
            return checkReg(data)
    }
}

module.exports = register;