/**
 * Created by Lever on 16/11/15.
 */
const feed = async (ctx, next) => {
    ctx.status = 200;
    ctx.type = "application/xml";
    const data = ctx.request.body.xml;
    const resMsg = `<xml>
<ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
<FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
<CreateTime>${parseInt(new Date().valueOf() / 1000)}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${data.Content}]]></Content>
</xml>`;
    ctx.body = resMsg;
};

module.exports = {
    "POST /app": feed
};
