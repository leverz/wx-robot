const client = require("./redis");

module.exports = (userId, wechatId) => client.hmset(userId, {"wechat": wechatId});