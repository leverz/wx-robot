const redis = require("redis");

redis.createClient({
    host: "127.0.0.1",
    port: "6379"
});

redis.on("error", error => console.log(`error event - ${redis.host} : ${redis.port} - ${error}`))

const redis_get_string = () => {
    redis.set("key", ["string"], (error, response) => {
        redis.get("key", (error, resp) => console.log(resp))
    })
}