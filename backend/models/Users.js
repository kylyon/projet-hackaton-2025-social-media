const mongoose= require("mongoose"); 
const crypto = require ("node:crypto"); 
const UserError = require ("../errors/users/userError.js")


//Modele de schema MongoDB pour les tokens d'authentification
const tokenSchema = new mongoose.Schema(
    {
        tokenId: { type: String, required: true },
        tokenId: { type: String, required: true },
        userId: { type: String, required: true },
        expiresAt: String
    }
);

//Modele de schema MongoDB pour les utilisateurs
const userSchema = new mongoose.Schema(
    {
        uuid: { type: String, required: true, unique: true },
        email : { type: String, required: true, unique: true },
        firstname: String,
        lastname: String,
        username: { type: String, required: true, unique: true },
        avatar: String,
        hobbies: Array,
        hobbies: Array,
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

const checkMailValidity = (email) =>
{
    return email.includes("@") && email.includes(".")
}

const checkUniqueFields = async (email, username) =>
{
    const errors = []

    try {
        const emailInDB = await UserModel.exists({email})

        if(emailInDB) errors.push({key : "email", value: email, message: "Cet email est déjà utilisé"})

        const usernameInDB = await UserModel.exists({username})

        if(usernameInDB) errors.push({key : "username", value: username, message: "Ce nom d'utilisateur est déjà utilisé"})

        return errors;
    } catch (error) {
        return {error, message: "Erreur lors de la requête"}
    }
}

export default class User
{
    #_uuid
    #_email;
    #_firstname;
    #_lastname;
    #_username;
    #_avatar;
    #_hobbies;
    #_hobbies;
    #_password;
    #_role;

    constructor(email, fisrtname, lastname, username, avatar, hobbies, password)
    constructor(email, fisrtname, lastname, username, avatar, hobbies, password)
    {
        this.#_email = email;
        this.#_firstname = fisrtname;
        this.#_lastname = lastname;
        this.#_username = username;
        this.#_avatar = avatar;
        this.#_hobbies = hobbies;
        this.#_hobbies = hobbies;
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

    get hobbies()
    get hobbies()
    {
        return this.#_hobbies;
        return this.#_hobbies;
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
     * Insert the user in the database
     * @returns the user JSON object from MongoDB or false
     */
    static async createUser(userInfo, role="user")
    {   
        const { email, username, password, uuid } = userInfo

        try {
            if(!email | !username | !password | !uuid) throw new UserError("Champs obligatoire manquant", "MISSING_REQUIRED_FIELD");

            const uniqueFiledsError = await checkUniqueFields(email, username);

            if(uniqueFiledsError.length) throw new UserError("Champs dupliqué, impossible de créer l'utilisateur", "ALREADY_USED_FIELD", uniqueFiledsError)
        try {
            if(!email | !username | !password | !uuid) throw new UserError("Champs obligatoire manquant", "MISSING_REQUIRED_FIELD");

            const uniqueFiledsError = await checkUniqueFields(email, username);

            if(uniqueFiledsError.length) throw new UserError("Champs dupliqué, impossible de créer l'utilisateur", "ALREADY_USED_FIELD", uniqueFiledsError)

            if(!checkMailValidity(email)) throw new UserError("L'adresse mail n'est pas valide", "INVALID_MAIL");
            if(!checkMailValidity(email)) throw new UserError("L'adresse mail n'est pas valide", "INVALID_MAIL");

            userInfo.role = role
            userInfo.role = role

            const userDB = await UserModel.create(userInfo)

            const user = userDB.toJSON()
            return user;
        } catch (error) {
            console.log(error.message)
            return {status:500, message : error.message, error}
            console.log(error.message)
            return {status:500, message : error.message, error}
        }
    }

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
            console.log(error)
            return {status:500, message : "Erreur lors de la recherche d'utilisateurs", error}
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
        if(updatedFields.email && !checkMailValidity(updatedFields.email)) throw new UserError("L'adresse mail n'est pas valide", "INVALID_MAIL");

        try {
            
            await UserModel.findOneAndUpdate({uuid:userId}, 
                updatedFields
            )
            const userDB= await UserModel.findOne({uuid:userId})
            return userDB ?? null
        } catch (error) {
            return {status:500, message : "Erreur lors de la mise à jour d'utilisateurs", error}
        }
    }

    // Delete User
    static async deleteUser(userId)
    {
        try {
            
           
            const userDB= await UserModel.findOneAndDelete({uuid:userId}); 
            return userDB ?? null
        } catch (error) {
            return {status:500, message : "Erreur lors de la suppression d'utilisateurs", error}
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
                hobbies : this.#_hobbies, 
                hobbies : this.#_hobbies, 
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


module.exports = User;