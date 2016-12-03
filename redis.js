const redis = require("redis");
const Q = require("bluebird");
Q.promisifyAll(redis.RedisClient.prototype);
Q.promisifyAll(redis.Multi.prototype);

redis.createClient({
    host: "127.0.0.1",
    port: "6379"
});
console.log(redis);
redis.on("error", error => console.log(`error event - ${redis.host} : ${redis.port} - ${error}`))

const redis_get_string = () => {
    redis.set("key", ["string"], (error, response) => {
        redis.get("key", (error, resp) => console.log(resp))
    })
}

const redis_get_string_async = () => {
    const promise = redis.setAsync("key", ["string"])
    .then(res => redis.getAsync("key"))
    .then(res => console.log(res))

    return promise;
}
redis_get_string();