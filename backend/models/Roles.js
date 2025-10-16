import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: false },
        permission : { type: Array, required: true, unique: false }
    }
);


const RolesModel = mongoose.model("Role", RolesSchema);

export default class Role
{
    #_title;
    #_permission;
  

    constructor(title,permission)
    {
        
        this.#_title = title;
        this.#_permission = permission;
    }


    get permission()
    {
        return this.#_permission;
    }

    get title()
    {
        return this.#_title;
    }

    
    /**
     * Static function
     * 
     */

    // Get All Role
    static async getAllRole()
    {
        try {
            const roleDB = await RolesModel.find({})
            return roleDB.length > 0 ? roleDB : null
        } catch (error) {
            console.log("[Error post]",error)
        }
    }

    //Add Role 

    static async addRole(data)
    {
        try {
            
            const addRole= await RolesModel.create(data)
            return addRole?? null; 

        } catch (error) {
            console.log("[Error roles]",error)
        }
    }

    //Update Role

    static async updateRole(RoleId, updatedFields)
    {
        try {
            
            await RolesModel.findOneAndUpdate({_id:RoleId}, 
                updatedFields
            )
            const roleDB= await RolesModel.findOne({_id:RoleId})
            return roleDB ?? null
        } catch (error) {
            console.log("[Error roles]",error)
        }
    }


    // Delete Role
    static async deleteRole(RoleId)
    {
        try {
            const RoleDB= await RolesModel.findOneAndDelete({_id:RoleId}); 
            return RoleDB ?? null
        } catch (error) {
            console.log("[Error roles]",error)
        }
    }

    //Instance methods

    async createRoleDB()
    {
        try {
            const RoleDB = await RolesModel.create({
                title: this.#_title, 
                permission : this.#_permission 
            });

            const Role = RoleDB.toJSON()
            
            return Role;
        } catch (error) {
            console.error("Erreur lors de la création du Role", error)
            return false
        }
    }

}
