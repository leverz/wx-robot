/**
 * Created by Lever on 16/11/8.
 */
require("babel-core/register");
require("babel-polyfill");

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(ctx => ctx.body = "Hello Koa in app-async.js");

app.listen(3000);

console.log("Open Url: http://localhost:3000");