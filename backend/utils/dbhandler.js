import mongoose from "mongoose";

export default class DB
{
    #_db;
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

    async connect()
    {
        try {
            this.#_db = await mongoose.connect(process.env.MONGO_URI)
            console.log('✅ Connecté à MongoDB Atlas')
        } catch (error) {
            console.error('❌ Erreur MongoDB:', err)
        }
    }

    
}