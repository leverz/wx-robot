const client = require("./redis")

module.exports = (userId, username) => client.hmset(userId, {"name": username})