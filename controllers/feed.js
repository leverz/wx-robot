/**
 * Created by Lever on 16/11/15.
 */
const getUser = require("../model/getUser")
const register = require("./register")

const wait = time => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(time)
        resolve(time)
    }, time)
})

const feed = async (ctx, next) => {
    ctx.status = 200
    ctx.type = "application/xml"

    const data = ctx.request.body.xml

    const rData = await getUser(data.FromUserName[0])

    let content = "";

    if (!!rData && rData.isReady === "true") {

    } else {
        content = register(data, rData)
    }
    console.log("begin");
    await wait(3000);
    console.log("end");

    ctx.body = `<xml>
<ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
<FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
<CreateTime>${parseInt(new Date().valueOf() / 1000)}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${content}]]></Content>
</xml>`
}

module.exports = {
    "POST /app": feed
}
