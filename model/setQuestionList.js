const client = require("./redis");

module.exports = (userId, question) => client.hmset(userId, {"question": JSON.stringify(question)})