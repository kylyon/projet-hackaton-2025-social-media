import Admin from "../models/Admins.js";
import Moderator from "../models/Moderators.js";
import User from "../models/Users.js";
import crypto from "crypto"

export default class UsersFactory
{
    static async createUser(role, email, firstname, lastname, username, avatar, hobbies, password)
    {
        //Generate UUID
        const salt = crypto.randomBytes(16)
        const uuid = crypto.createHmac("sha512", salt).update(email + firstname + lastname + username).digest("hex")

        const userInfo = {uuid, email, firstname, lastname, username, avatar, hobbies, password}

        try {
            switch(role.toLowerCase())
            {
                case "user":
                    const user = User.createUser(userInfo)
                    return user;
                case "admin":
                    const admin = Admin.createUser(userInfo, "admin")
                    return admin
                case "moderator":
                    const moderator = Moderator.createUser(userInfo, "moderator")
                    return moderator
                default:
                    throw new Error("Aucun role ne correspond")
            }
        } catch (error) {
            return {status: 401, error, message : "Erreur lors de la création d'un utilisateur"}
        }
        
    }
}