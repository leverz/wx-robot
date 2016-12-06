"use strict";

var redis = require("redis");
var Q = require("bluebird");
Q.promisifyAll(redis.RedisClient.prototype);
Q.promisifyAll(redis.Multi.prototype);

var client = redis.createClient({
    host: "127.0.0.1",
    port: "6379"
});
client.on("error", function (error) {
    return console.log("error event - " + redis.host + " : " + redis.port + " - " + error);
});

var redis_get_string_async = function redis_get_string_async() {
    var promise = client.setAsync("key", ["string"]).then(function (res) {
        return client.getAsync("key");
    }).then(function (res) {
        return console.log(res);
    });

    return promise;
};
console.log("Hello, Lever");
redis_get_string_async().then(function () {
    return console.log("Hello, Redis");
});