const redis = require("redis");
const Q = require("bluebird");
Q.promisifyAll(redis.RedisClient.prototype);
Q.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
    host: "127.0.0.1",
    port: "6379"
});
client.on("error", error => console.log(`error event - ${redis.host} : ${redis.port} - ${error}`))

const redis_get_string_async = () => {
    const promise = client.setAsync("key", ["string"])
    .then(res => client.getAsync("key"))
    .then(res => console.log(res))

    return promise;
}
redis_get_string_async().then(() => console.log("Hello, Redis"));