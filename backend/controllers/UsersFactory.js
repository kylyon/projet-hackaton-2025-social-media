import { User } from "../models/Users.js";

export default class UsersFactory
{
    static async createUser(role, email, fisrtname, lastname, avatar, adressesList, password)
    {
        switch(role.toLowerCase())
        {
            case "user":
                const user = new User(email, fisrtname, lastname, avatar, adressesList, password, role)
                const res = await user.createUserDB()
                return res ? user : res;
        }
    }
}.