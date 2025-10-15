// Get all users
const getUsers = (req, res) => {
  res.status(200).json({ message: "User route is working", status: "200" });
};

// Create a new user
const createUsers = (req, res) => {
  res.status(200).json({ message: "User create route is working", status: "200" });
};

// Get user by ID
const getUsersById = (req, res) => {
  res.json({user: req.user})
  res.status(200).json({ message: "User by ID route is working", status: "200" });
};

// Update user
const updatesUsers = (req, res) => {
  res.status(200).json({ message: "User update route is working", status: "200" });
};

// Delete user
const deleteUsers = (req, res) => {
  res.status(200).json({ message: "User delete route is working", status: "200" });
};


module.exports = {
  getUsers,
  createUsers,
  getUsersById,
  updatesUsers,
  deleteUsers
};
