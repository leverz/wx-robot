/**
 * Created by Lever on 16/11/8.
 */
require("babel-core/register");
require("babel-polyfill");

const Koa = require('koa');
const app = new Koa();
const controller = require("./controller");
const xmlParser = require("koa-xml-body").default;

app.use(xmlParser());

app.use(controller());

app.use(function* (next){
    const start = new Date();
    yield next;
    const ms = new Date() - start;
    console.log(`${this.method} ${this.url} - ${ms}ms`);
});

app.listen(3000);

console.log("Open Url: http://localhost:3000");