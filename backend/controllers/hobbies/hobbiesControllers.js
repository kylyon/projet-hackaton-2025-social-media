// Get all hobbies
const getHobbies = (req, res) => {
  res.status(200).json({ message: "Hobby route is working", status: "200" });
};

// Create a new hobby
const createHobby = (req, res) => {
  const hobby = req.body;
  res.status(200).json({ message: "Hobby create route is working", status: "200", hobby });
};

// Update hobby
const updateHobby = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "Hobby update route is working", status: "200", id });
};

// Delete hobby
const deleteHobby = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "Hobby delete route is working", status: "200", id });
};

module.exports = {
    getHobbies,
    createHobby,
    updateHobby,
    deleteHobby
};
