import mongoose from "mongoose";
import crypto from "crypto"


//Modele de schema MongoDB pour les tokens d'authentification
const tokenSchema = new mongoose.Schema(
    {
        tokenId: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        expiresAt: String
    }
);

//Modele de schema MongoDB pour les utilisateurs
const userSchema = new mongoose.Schema(
    {
        uuid: { type: String, required: true, unique: true },
        email : { type: String, required: true, unique: true },
        fisrtname: String,
        lastname: String,
        username: { type: String, required: true, unique: true },
        avatar: String,
        adressesList: Array,
        password: String,
        role: String,
        token : tokenSchema
    }
);

//Modification de la fonction toJSON sur le schema de user pour retirer les MDP dans la reponse
userSchema.set('toJSON', 
    { 
        transform: (document, returnedObject) => { delete returnedObject.password; } 
    }
)

const UserModel = mongoose.model("User", userSchema);

export default class User
{
    #_uuid
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

        //Generate UUID
        const salt = crypto.randomBytes(16)
        this.#_uuid = crypto.createHmac("sha512", salt).update(email + fisrtname + lastname + username).digest("hex")
    }

    //Getter

    get uuid()
    {
        return this.#_uuid;
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

    //Static methods

    /**
     * Find users
     * @param {Object} userInfo - The JSON object filter fields
     * @returns an array of Users
     */
    static async findUser(userInfo)
    {
        try {
            const userDB = await UserModel.find(userInfo)
            return userDB.length > 0 ? userDB : null
        } catch (error) {
            console.log("[Error user]",error)
        }
    }

    /**
     * Update an user
     * @param {string} userId - The user unique ID of the user to update
     * @param {Object} updatedFields - The JSON object with the fields to update
     * @returns 
     */
    static async updateUser(userId, updatedFields)
    {
        try {
            
            await UserModel.findOneAndUpdate({uuid:userId}, 
                updatedFields
            )
            const userDB= await UserModel.findOne({uuid:userId})
            return userDB ?? null
        } catch (error) {
            console.log("[Error user]",error)
        }
    }

    // Delete User
    static async deleteUser(userId)
    {
        try {
            
           
            const userDB= await UserModel.findOneAndDelete({uuid:userId}); 
            return userDB ?? null
        } catch (error) {
            console.log("[Error user]",error)
        }
    }

    //Instance methods

    /**
     * Insert the user in the database
     * @returns the user JSON object from MongoDB or false
     */
    async createUserDB()
    {
        try {
            const userDB = await UserModel.create({
                uuid: this.#_uuid,
                email: this.#_email, 
                fisrtname : this.#_firstname , 
                lastname : this.#_lastname, 
                username : this.#_username, 
                avatar : this.#_avatar, 
                adressesList : this.#_adressesList, 
                password : this.#_password, 
                role : this.#_role 
            })

            const user = userDB.toJSON()
            delete user.password
            return user;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur dans la base de données", error)
            return false
        }
    }


}
