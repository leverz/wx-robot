const client = require("./redis")

/**
 * 修改指定用户的状态
 * @param  {String} userId 用户ID
 * @param  {String} status 所处状态
 * @return {Promise}        携带状态的Promise
 */
module.exports = (userId, status) => client.hmset(userId, {"status": status})