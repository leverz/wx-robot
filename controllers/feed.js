/**
 * Created by Lever on 16/11/15.
 */
const register = require("./register")
const reduce = require("./reduce")
const feed = async (ctx, next) => {
    ctx.status = 200
    ctx.type = "application/xml"
    const data = ctx.request.body.xml

    const content = reduce(data.Content)

    const resMsg = `<xml>
<ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
<FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
<CreateTime>${parseInt(new Date().valueOf() / 1000)}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${content}]]></Content>
</xml>`
    ctx.body = resMsg
};

module.exports = {
    "POST /app": feed
};
