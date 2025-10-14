import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : { type: String, required: true, unique: true },
        fisrtname: String,
        lastname: String,
        username: String,
        avatar: String,
        adressesList: Array,
        password: String,
        role: String,

    }
);

const UserModel = mongoose.model("User", userSchema);

export default class User
{
    #_id
    #_email;
    #_firstname;
    #_lastname;
    #_username;
    #_avatar;
    #_adressesList;
    #_password;
    #_role;

    constructor(email, fisrtname, lastname, username, avatar, adressesList, password)
    {
        this.#_email = email;
        this.#_firstname = fisrtname;
        this.#_lastname = lastname;
        this.#_username = username;
        this.#_avatar = avatar;
        this.#_adressesList = adressesList;
        this.#_password = password;
        this.#_role = "user";
    }

    get username()
    {
        return this.#_username;
    }

    get email()
    {
        return this.#_email;
    }

    get firstname()
    {
        return this.#_firstname;
    }

    get lastname()
    {
        return this.#_lastname;
    }

    get avatar()
    {
        return this.#_avatar;
    }

    get adressesList()
    {
        return this.#_adressesList;
    }

    get password()
    {
        return this.#_password
    }

    get role()
    {
        return this.#_role
    }

    async createUserDB()
    {
        try {
            const userDB = await UserModel.create({
                email: this.#_email, 
                fisrtname : this.#_firstname , 
                lastname : this.#_lastname, 
                username : this.#_username, 
                avatar : this.#_avatar, 
                adressesList : this.#_adressesList, 
                password : this.#_password, 
                role : this.#_role 
            })



            return true;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur dans la base de données", error)
            return false
        }
    }


}
