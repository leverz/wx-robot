const client = require("./redis");

module.exports = (userId, wechatId) => client.hmsetAsync(userId, {"wechat": wechatId});