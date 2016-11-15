/**
 * Created by Lever on 16/11/15.
 */
const fs = require("fs");

const addMapping = (router, file) => {
    for (const url in file) {
        if (url.startsWith("GET ")) {
            const path = url.substring(4);
            router.get(path, file[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith("POST ")) {
            const path = url.substring(5);
            router.post(path, file[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
};
const addControllers = (router, dir) => {
    const files = fs.readdirSync(`${__dirname}/${dir}`);
    const jsFiles = files.filter(item => item.endsWith(".js"));
    jsFiles.forEach(item => {
        console.log(`process controller: ${item}...`);
        const file = require(`${__dirname}/${dir}/${item}`);
        addMapping(router, file);
    });
};

module.exports = (dir = "controllers") => {
    const router = require("koa-router")();
    addControllers(router, dir);

    return router.routes();
};
