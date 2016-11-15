/**
 * Created by Lever on 16/11/15.
 */
const config = require("../weChat/config");
const hashCodeCyp = require("../weChat/token");
const app = async (ctx, next) => {
    await next;
    const signature = ctx.query.signature;
    const timestamp = ctx.query.timestamp;
    const nonce = ctx.query.nonce;
    const echostr = ctx.query.echostr;
    const token = config.token;

    console.log("signature:", signature);
    console.log("timestamp:", timestamp);
    console.log("nonce:", nonce);
    console.log("echostr:", echostr);

    if (signature && timestamp && nonce && echostr) {
        const hashCode = hashCodeCyp(token, timestamp, nonce);
        if (hashCode === signature) {
            // 返回echostr
            ctx.body = echostr;
        }
    }
};

module.exports = {
    "GET /app": app
};
