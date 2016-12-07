const client = require("./redis")

module.exports = (userId, isReady) => client.hmset(userId, {"isReady": isReady})