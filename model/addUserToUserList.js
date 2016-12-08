const client = require("./redis")

module.exports = userId => client.sadd("userList", userId)