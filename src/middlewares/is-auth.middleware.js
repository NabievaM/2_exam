const { verifyToken } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.headers.authorization;

    if (!token)
        return res.status(401).json({ message: "Invalid Tokens" });
    
    verifyToken(token, (err, data) => {
        if (err) return res.status(401).json({ message: "Invalid Token" });

        req.user = data;
        next();
    });
};

module.exports = isAuth;