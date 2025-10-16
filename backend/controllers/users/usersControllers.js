const { default:UsersFactory } = require("../UsersFactory.js");
const {default:User} = require ("../../models/Users");



// Get all users
const getUsers = async (req, res) => {

  try {

      const data = await User.findUser({})      
      res.status(200).json({ message: `Request success`, data: data });
  }
  catch(error){
      console.error("Error server : can't get all data ");
      return res.status(500).json({ message: "Internal server error", status: "500" });
  }
};

// Create a new user
const createUsers = async (req, res) => {
 
  const user = req.body;
  // Check if all required fields are present
  const {email, firstname, lastname, username, avatar, addressesList, password } = user

  try {

    if(!email ||  !username || !password){
      return res.status(400).json({ message: "Missing parameters", status: "400" }); 
    }
    // Create new user

    const newUser = await UsersFactory.createUser("user", email, firstname, lastname, username, avatar, addressesList, password);

    // Check if user creation was successful
    if(!newUser) return res.status(400).json({ message: "Error creating user", status: "400" });

    // Respond with success message and created user
    return res.status(200).json({ message: `User ${newUser.username} created successfully`, status: "200" });

  } catch (error) {

    console.error("Error creating user:", error);

    return res.status(500).json({ message: "Internal server error", status: "500" });
  }
  
};

// Get user by ID
const getUsersById = async (req, res) => {
 
  const usernameInput = req.params.id;

  try {

      const userID = await User.findUser(
            {
                username: usernameInput,
            }
        )

      if(!userID) return res.status(401).json({message: "User not find", status: 401});

      const data = userID[0]; 
      
      res.status(200).json({ message: `Request success`, data: data });
  }
  catch(error){
      console.error("Error when get user by id:", error);
      return res.status(500).json({ message: "Internal server error", status: "500" });
  }

};

// Update user
const updatesUsers = async (req, res) => {
  const userId = req.params.id;
  const updatedFields=req.body; 

  try {

      const updateUser = await User.updateUser(userId,updatedFields)
      //console.log(updateUser); 

      if(!updateUser) return res.status(500).json({message: "Update user Failed", status: 401});
      
      res.status(200).json({ message: `${userId} profile update successfully`, user : updateUser});

  }catch(error){
      console.error("Error when update by id:", error);
      return res.status(500).json({ message: "Internal server error", status: "500" });
  }
};

// Delete user
const deleteUsers = async (req, res) => {

  const userId = req.params.id;

  try {
      const updateUser = await User.deleteUser(userId)

      if(!updateUser) return res.status(500).json({message: "Failed delete User", status: 401});
      
      res.status(200).json({ message: `${userId} delete successfully`, user : updateUser});

  }catch(error){
      console.error("Error when delete user by id:", error);
      return res.status(500).json({ message: "Internal server error", status: "500" });
  }

};


module.exports = {
  getUsers,
  createUsers,
  getUsersById,
  updatesUsers,
  deleteUsers
};
