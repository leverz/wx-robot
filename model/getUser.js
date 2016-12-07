const client = require("./redis");
/**
 * 根据用户ID获取用户信息
 * @param  {String} userId 用户ID
 * @return {Promise}        携带状态的Promise
 */
module.exports = userId => client.hgetallAsync(userId)