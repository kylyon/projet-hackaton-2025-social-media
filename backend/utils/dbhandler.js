const mongoose = require("mongoose");

class DB
{
    static #_db;
    static #instance = null

    constructor()
    {
        if(DB.#instance)
        {
            console.error("Base de données déjà créée")
            return this
        }

        DB.#instance = this
    }

    static async connect()
    {
        if(DB.#instance)
        {
            console.error("Base de données déjà connecté")
            return this.#_db
        }

        DB.#instance = this

        try {
            this.#_db = await mongoose.connect(process.env.MONGO_URI)
            console.log('✅ Connecté à MongoDB Atlas')

            return this.#_db;
        } catch (error) {
            console.error('❌ Erreur MongoDB:', err)
        }
    }

    
}

module.exports = DB;