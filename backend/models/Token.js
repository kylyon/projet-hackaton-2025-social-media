import mongoose from "mongoose";
import crypto from "crypto"

const tokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        expiresAt: String
    }
);

const TokenModel = mongoose.model("Token", tokenSchema);

const generateToken = () => 
{
    return crypto.randomBytes(32).toString("hex")
}

export default class AuthToken
{
    static async createAuthToken(userId, ttl = 3600)
    {
        const token = generateToken();
        const expiresAt = Date.now() * 1000 * ttl

        try
        {
            const tokenDB = await TokenModel.create({
                token, 
                userId,
                expiresAt
            })

            return {token, expiresAt}
        }catch(error)
        {
            console.error("Error", error)
        }
        
    }

    static async getAuthToken(token)
    {
        try
        {
            const tokenDB = await TokenModel.find(
                {
                    token
                }
            )

            return tokenDB.length ? tokenDB[0] : null
        }catch(error)
        {
            console.error("[Token Error]", error)
        }
    }

    static async deleteAuthToken(token)
    {
        try
        {
            const tokenDB = await TokenModel.findOneAndDelete(
                {
                    token
                }
            )

            return tokenDB
        }catch(error)
        {
            console.error("[Token Error]", error)
        }
    }
}