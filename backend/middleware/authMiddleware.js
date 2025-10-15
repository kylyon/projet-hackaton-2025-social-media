const { default: AuthToken } = require("../models/Token");

const authMiddleware = (req, res, next) =>
{
    const token = req.cookie?.auth_token;

    console.log(req.cookie)

    if(!token) return res.status(400).json({message: "Token manquant"});

    const entry = AuthToken.getAuthToken(token);
    if(!entry) return res.status(400).json({message: "Token invalide"});

    if(Date.now() > entry.expiresAt)
    {
        AuthToken.deleteAuthToken(token);
        return res.status(400).json({message: "Token expiré"});
    }

    req.user = {userId: entry.userId}
    next()
}

module.exports = {
    authMiddleware
}