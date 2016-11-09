"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by Lever on 16/11/8.
 */
require("babel-core/register");
require("babel-polyfill");

var Koa = require('koa');
var app = new Koa();

app.use(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var start, ms;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        start = new Date();
                        _context.next = 3;
                        return next();

                    case 3:
                        ms = new Date() - start;

                        console.log(ctx.method + " " + ctx.url + " - " + ms + "ms");

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.use(function (ctx) {
    return ctx.body = "Hello Koa in app-async.js";
});

app.listen(3000);

console.log("Open Url: http://localhost:3000");