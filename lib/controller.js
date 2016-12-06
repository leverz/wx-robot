"use strict";

/**
 * Created by Lever on 16/11/15.
 */
var fs = require("fs");

var addMapping = function addMapping(router, file) {
    for (var url in file) {
        if (url.startsWith("GET ")) {
            var path = url.substring(4);
            router.get(path, file[url]);
            console.log("register URL mapping: GET " + path);
        } else if (url.startsWith("POST ")) {
            var _path = url.substring(5);
            router.post(_path, file[url]);
            console.log("register URL mapping: POST " + _path);
        } else {
            console.log("invalid URL: " + url);
        }
    }
};
var addControllers = function addControllers(router, dir) {
    var files = fs.readdirSync(__dirname + "/" + dir);
    var jsFiles = files.filter(function (item) {
        return item.endsWith(".js");
    });
    jsFiles.forEach(function (item) {
        console.log("process controller: " + item + "...");
        var file = require(__dirname + "/" + dir + "/" + item);
        addMapping(router, file);
    });
};

module.exports = function () {
    var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "controllers";

    var router = require("koa-router")();
    addControllers(router, dir);

    return router.routes();
};