import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : { type: String, required: true, unique: true },
        fisrtname: String,
        lastname: String,
        avatar: String,
        adressesList: Array,
        password: String,
        role: String,

    }
);

const UserModel = mongoose.model("User", userSchema);

export class User
{
    #_email;
    #_firstname;
    #_lastname;
    #_avatar;
    #_adressesList;
    #_password;
    #_role;

    constructor(email, fisrtname, lastname, avatar, adressesList, password, role)
    {
        this.#_email = email;
        this.#_firstname = fisrtname;
        this.#_lastname = lastname;
        this.#_avatar = avatar;
        this.#_adressesList = adressesList;
        this.#_password = password;
        this.#_role = role;
    }

    async createUserDB()
    {
        try {
            const userDB = await UserModel.create({
                email: this.#_email, 
                fisrtname : this.#_firstname , 
                lastname : this.#_lastname, 
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
