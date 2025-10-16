const {default: Role} = require ("../../models/Roles");

// Get all roles
const getRoles = async (req, res) => {
  try {
  
          const data = await Role.getAllRole()      
          res.status(200).json({ message: `Request success`, data: data });
    } catch(error){
        console.error("Error server : can't get all data ");
        return res.status(500).json({ message: "Internal server error", status: "500" });
    }
};

// Create a new role
const createRoles = async (req, res) => {
  
    const roleField = req.body;
    // Check if all required fields are present
    const {title, permission} = roleField
  
     try {
    
        if(!title ||  !permission){
          return res.status(400).json({ message: "Missing parameters", status: "400" }); 
        }
        // Create new role
    
        const newRole = await Role.addRole(roleField);
    
        // Check if role creation was successful
        if(!newRole) return res.status(400).json({ message: "Error creating role", status: "400" });
    
        // Respond with success message and created role
        return res.status(200).json({ message: `Role created successfully`, status: "200" });
    
      } catch (error) {
    
        console.error("Error creating role:", error);
    
        return res.status(500).json({ message: "Internal server error", status: "500" });
      }
};

// Update role
const updateRoles = async (req, res) => {

     const roleId = req.params.id;
     const updatedFields=req.body; 
   
     try {
   
         const updateRole = await Role.updateRole(roleId,updatedFields)
         
         if(!updateRole) return res.status(500).json({message: "Update Role Failed", status: 401});
         
         res.status(200).json({ message: `Role update successfully`, data : updateRole});
   
     }catch(error){
         console.error("Error when update Role by id:", error);
         return res.status(500).json({ message: "Internal server error", status: "500" });
     }
};

// Delete role
const deleteRoles = async (req, res) => {

    const RoleId = req.params.id;
    
    try {
        const updateRole = await Role.deleteRole(RoleId)
  
        if(!updateRole) return res.status(500).json({message: "Failed delete Role", status: 401});
        
        res.status(200).json({ message: `Role delete successfully`, data : updateRole});
  
    }catch(error){
        console.error("Error when delete Role by id:", error);
        return res.status(500).json({ message: "Internal server error", status: "500" });
    }
};

module.exports = {
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles
};
