
module.exports = content => {
    if (content.filter(item => /注册/.test(item)).length > 0) {
        return `欢迎`
    } else {
        return "暂不支持未注册用户，回复【注册】进入注册流程"
    }
}