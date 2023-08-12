const jwt = require("jsonwebtoken");
const config = require("../../config");

const secretKey = config.jwtSecretKey;

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "3h" });
};

const verifyToken = (payload, callback) => {
    return jwt.verify(payload, secretKey, callback);
};

module.exports = { generateToken, verifyToken };