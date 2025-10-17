const crypto = require("node:crypto"); 
const User = require("./Users.js"); 

/*const TokenModel = mongoose.model("Token", tokenSchema);*/

/**
 * Generate a auth token
 * @param {string} userId - The user unique ID
 * @param {string} userAgent - The user navigator agent used to login
 * @returns 
 */
const generateToken = (userId, userAgent) => 
{
    const salt = crypto.randomBytes(16)
    const hash = crypto.createHmac("sha512", salt).update(userId+userAgent).digest("hex");
    return {salt: salt.toString("hex"), hash}
}

class AuthToken
{

    /**
     * 
     * @param {string} userId - The user unique ID
     * @param {string} userAgent - The user navigator agent used to login
     * @param {Number} ttl - The time to live of the token
     * @returns 
     */
    static async createAuthToken(userId, userAgent, ttl = 3600)
    {
        const tokenId = generateToken(userId, userAgent).hash;
        const expiresAt = Date.now() * 1000 * ttl

        try
        {
            const tokenDB = await User.updateUser(
                userId,
                {
                    token : {
                        tokenId, 
                        expiresAt
                    }
                    
                })

            return {tokenId, expiresAt}
        }catch(error)
        {
            console.error("Error", error)
        }
        
    }

    /**
     * Get the auth token and its user
     * @param {string} token 
     * @returns the auth token
     */
    static async getAuthToken(token)
    {
        try
        {
            const tokenDB = await User.findUser(
                {
                    "token.tokenId": token
                }
            )

            return tokenDB.length ? { token: tokenDB[0].token.tokenId, user:tokenDB[0], expiresAt : tokenDB[0].token.expiresAt } : null
        }catch(error)
        {
            console.error("[Token Error]", error)
        }
    }

    /**
     * Delete the auth token
     * @param {string} token 
     * @returns the user associated to the deleted token
     */
    static async deleteAuthToken(token)
    {
        try
        {
            const userDB = await User.findUser(
                {
                    "token.tokenId": token
                }
            )

            if(userDB.length){
                await User.updateUser(
                userDB[0].uuid,
                {
                    $unset : {"token" : 1}
                    
                })
            }

            return userDB[0]
        }catch(error)
        {
            console.error("[Token Error]", error)
        }
    }
}

module.exports = AuthToken; 