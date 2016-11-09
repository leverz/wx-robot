/**
 * Created by Lever on 16/11/9.
 */
const crypto = require("crypto");

module.exports = (token, timestamp, nonce) => {
    const list = [token, timestamp, nonce];
    const cryptoString = list.sort().join("");
    const sha1 = crypto.createHash("sha1");
    sha1.update(cryptoString);
    const hashcode = sha1.digest("hex");

    return hashcode;
};