const mongoose = require("mongoose"); 

//Modele de schema MongoDB pour les utilisateurs
const hobbySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }
    }
);

const HobbyModel = mongoose.model("Hobby", hobbySchema);

class Hobby
{
    //Static methods

    
    static async createHobby(hobbyInfo)
    {
        try {
            const hobbyDB = await HobbyModel.create(hobbyInfo);
            return hobbyDB ?? null
        } catch (error) {
            return {status:500, message : "Erreur lors de la création de hobby", error}
        }
    }

    // Get Hobbies by id
     static async findHobbyId(hobbyInfo = {})
    {
        try {
            const hobbyDB = await HobbyModel.find(hobbyInfo);
            return hobbyDB.length ?  hobbyDB : null
        } catch (error) {
            return new Error("Erreur lors de la recherche de hobby")
        }
    }

    //

    static async findHobby(hobbyInfo = {})
    {
        try {
            const hobbyDB = await HobbyModel.find(hobbyInfo);
            return hobbyDB.length ?  hobbyDB : null
        } catch (error) {
            return new Error("Erreur lors de la recherche de hobby")
        }
    }

    static async updateHobby(hobbyId, updateInfo)
    {
        try {
            await HobbyModel.findOneAndUpdate({_id: hobbyId}, updateInfo);
            const hobbyDB = await HobbyModel.findOne({_id: hobbyId});
            return hobbyDB ?? null
        } catch (error) {
            return new Error("Erreur lors de la mis à jour de hobby")
        }
    }

    static async deleteHobby(hobbyId)
    {
        try {
            const hobbyDB = await HobbyModel.findOneAndDelete({_id: hobbyId});
            return hobbyDB ?? null
        } catch (error) {
            return new Error("Erreur lors de la suppression de hobby")
        }
    }
}

module.exports=Hobby