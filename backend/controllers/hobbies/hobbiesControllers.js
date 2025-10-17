const Hobby  = require("../../models/Hobbies");

// Get Hobbies by ID
const getHobbiesById = async (req, res) => {
 
  const HobbiesInput = req.params.id;

  try {

      const HobbiesID = await Hobby.findHobbyId(
            {
                _id: HobbiesInput,
            }
        )

      if(!HobbiesID) return res.status(401).json({message: "Hobbies not find", status: 401});

      const data = HobbiesID[0]; 
      
      res.status(200).json({ message: `Request success`, data: data });
  }
  catch(error){
      console.error("Error when get Hobbies by id:", error);
      return res.status(500).json({ message: "Internal server error", status: "500" });
  }

};

// Get all hobbies
const getHobbies = async (req, res) => {
  try {
    const hobbies = await Hobby.findHobby()

    if(!hobbies) return res.status(200).json({message: "No hobbies found"});

    if(hobbies.status === 500) return res.status(500).json({message: "Error while finding hobbies", error : hobbies.error});

    res.status(200).json({message: "Hobbies found", hobbies})
  } catch (error) {
    res.status(500).json({error, message: "Error while finding hobbies"})
  }
  //res.status(200).json({ message: "Hobby route is working", status: "200" });
};

// Create a new hobby
const createHobby = async (req, res) => {
  const hobbyInfo = req.body;

  try {
    const hobby = await Hobby.createHobby(hobbyInfo)

    if(hobby.status === 500) return res.status(500).json({message: "Hobby not created", error : hobby.error})

    res.status(200).json({message: "Hobby created", hobby})
  } catch (error) {
    res.status(500).json({error, message: "Error while creating hobbies"})
  }
  //res.status(200).json({ message: "Hobby create route is working", status: "200", hobby });
};

// Update hobby
const updateHobby = async (req, res) => {
  const id = req.params.id;
  const updateInfo = req.body;

  try {
    const hobby = await Hobby.updateHobby(id, updateInfo)

    if(hobby.status === 500) return res.status(500).json({message: "Error while updating hobby", error : hobby.error})

    res.status(200).json({message: "Hobby updated", hobby})
  } catch (error) {
    res.status(500).json({error, message: "Error while updating hobby"})
  }
  //res.status(200).json({ message: "Hobby update route is working", status: "200", id });
};

// Delete hobby
const deleteHobby = async (req, res) => {
  const id = req.params.id;
  
  try {
    const hobby = await Hobby.deleteHobby(id)

    if(hobby.status === 500) return res.status(500).json({message: "Error while deleting hobby", error : hobby.error})

    res.status(200).json({message: "Hobby deleted", hobby})
  } catch (error) {
    res.status(500).json({error, message: "Error while deleting hobby"})
  }
  //res.status(200).json({ message: "Hobby delete route is working", status: "200", id });
};

module.exports = {
    getHobbies,
    createHobby,
    updateHobby,
    deleteHobby,
    getHobbiesById
};
