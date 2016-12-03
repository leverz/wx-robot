"use strict";

var redis = require("redis");
var Q = require("bluebird");
Q.promisifyAll(redis.RedisClient.prototype);
Q.promisifyAll(redis.Multi.prototype);

redis.createClient({
    host: "127.0.0.1",
    port: "6379"
});
console.log(redis);
redis.on("error", function (error) {
    return console.log("error event - " + redis.host + " : " + redis.port + " - " + error);
});

var redis_get_string = function redis_get_string() {
    redis.set("key", ["string"], function (error, response) {
        redis.get("key", function (error, resp) {
            return console.log(resp);
        });
    });
};

var redis_get_string_async = function redis_get_string_async() {
    var promise = redis.setAsync("key", ["string"]).then(function (res) {
        return redis.getAsync("key");
    }).then(function (res) {
        return console.log(res);
    });

    return promise;
};
redis_get_string();