const { AuthToken } = require("../models/Token");

const authMiddleware = async (req, res, next) =>
{
    const token = req.cookies?.auth_token;

    if(!token) return res.status(400).json({message: "Token manquant"});

    const entry = await AuthToken.getAuthToken(token);
    if(!entry) return res.status(400).json({message: "Token invalide"});

    if(Date.now() > entry.expiresAt)
    {
        await AuthToken.deleteAuthToken(token);
        return res.status(400).json({message: "Token expiré"});
    }

    req.user = entry.user;
    next()
}

module.exports = {
    authMiddleware
}