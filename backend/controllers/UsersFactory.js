import Admin from "../models/Admins.js";
import Moderator from "../models/Moderators.js";
import User from "../models/Users.js";

export default class UsersFactory
{
    static async createUser(role, email, fisrtname, lastname, username, avatar, adressesList, password)
    {
        switch(role.toLowerCase())
        {
            case "user":
                const user = new User(email, fisrtname, lastname, username, avatar, adressesList, password)
                /*const res = await user.createUserDB()
                return res ? user : res;*/
                return user
            case "admin":
                const admin = new Admin(email, fisrtname, lastname, username, avatar, adressesList, password)
                return admin
            case "moderator":
                const moderator = new Moderator(email, fisrtname, lastname, username, avatar, adressesList, password)
                return moderator
            default:
                throw new Error("Aucun role ne correspond")
        }
    }
}