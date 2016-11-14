/**
 * Created by Lever on 16/11/8.
 */
require("babel-core/register");
require("babel-polyfill");

const Koa = require('koa');
const app = new Koa();
const router = require("koa-router")();
const hashCodeCyp = require("./weChat/token");
const config = require("./weChat/config");
const xmlParser = require("koa-xml-body").default;

app.use(xmlParser());

router.post("/", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/xml"
    });

    const data = req.body.xml;
    const resMsg = `<xml>
<ToUserName><![CDATA[${data.fromusername}]]></ToUserName>
<FromUserName><![CDATA[${data.tousername}]]></FromUserName>
<CreateTime>${parseInt(new Date().valueOf() / 1000)}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${data.content}]]></Content>
</xml>`;
    res.end(resMsg);
});
router.get("/app", function *(next){
    yield next;
    const signature = this.query.signature;
    const timestamp = this.query.timestamp;
    const nonce = this.query.nonce;
    const echostr = this.query.echostr;
    const token = config.token;

    console.log("signature:", signature);
    console.log("timestamp:", timestamp);
    console.log("nonce:", nonce);
    console.log("echostr:", echostr);

    if (signature && timestamp && nonce && echostr) {
        const hashCode = hashCodeCyp(token, timestamp, nonce);
        if (hashCode === signature) {
            // 返回echostr
            this.body = echostr;
        }
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(function* (next){
    const start = new Date();
    yield next;
    const ms = new Date() - start;
    console.log(`${this.method} ${this.url} - ${ms}ms`);
});

app.listen(3000);

console.log("Open Url: http://localhost:3000");