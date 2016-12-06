"use strict";

/**
 * Created by Lever on 16/11/8.
 */
require("babel-core/register");
require("babel-polyfill");

var Koa = require('koa');
var app = new Koa();
var controller = require("./controller");
var xmlParser = require("koa-xml-body").default;

app.use(xmlParser());

app.use(controller());

app.use(regeneratorRuntime.mark(function _callee(next) {
    var start, ms;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    start = new Date();
                    _context.next = 3;
                    return next;

                case 3:
                    ms = new Date() - start;

                    console.log(this.method + " " + this.url + " - " + ms + "ms");

                case 5:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, this);
}));

app.listen(3000);

console.log("Open Url: http://localhost:3000");