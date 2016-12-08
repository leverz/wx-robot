const request = require("request")

class Service {
    constructor(options){
        return new Promise((resolve, reject) => {
            request(options, (err, res, body) => {
                if (res) {
                    resolve(JSON.parse(body))
                } else {
                    reject(err)
                }
            })
        })
    }
}

module.exports = Service;