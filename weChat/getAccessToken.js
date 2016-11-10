/**
 * Created by Lever on 16/11/10.
 */
const request = require("request");
const config = require("./config");

module.exports = code => {
    const reqUrl = "https://api.weixin.qq.com/cgi-bin/token?";
    const params = {
        appid: config.appId,
        secret: config.appSecret,
        code: code,
        grant_type: "client_credential"
    };
    const options = {
        method: "GET",
        url: reqUrl
    };

    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (res) {
                resolve(JSON.parse(body));
            } else {
                reject(err);
            }
        });
    });
};