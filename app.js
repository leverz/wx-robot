/**
 * Created by Lever on 16/11/8.
 */
require("babel-core/register");
require("babel-polyfill");

const Koa = require('koa');
const app = new Koa();
const router = require("koa-router")();
const hashCodeCyp = require("./token");

function getUrlParam (url, name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i"),
        stringStart = url.indexOf("?") + 1;
    const r = url.substr(stringStart).match(reg);
    if (r !== null) {
        const valueIndex = 2;

        return decodeURIComponent(r[valueIndex]);
    }

    return null;
};

router.get("/app", function *(next){
    this.body = "Hello world!";
    const signature = getUrlParam(this.request.url, "signature");
    const timestamp = getUrlParam(this.request.url, "timestamp");
    const nonce = getUrlParam(this.request.url, "nonce");
    const echostr = getUrlParam(this.request.url, "echostr");
    const token = "Lever";

    console.log("signature:", signature);
    console.log("timestamp:", timestamp);
    console.log("nonce:", nonce);
    console.log("echostr:", echostr);

    if (signature && timestamp && nonce && echostr) {
        const hashCode = hashCodeCyp(token, timestamp, nonce);
        if (hashCode === signature) {
            // 返回echostr
        }
    }
});
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(ctx => ctx.body = "Hello Koa in app-async.js");

app.listen(3000);

console.log("Open Url: http://localhost:3000");